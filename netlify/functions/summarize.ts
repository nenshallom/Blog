import { createClient } from '@sanity/client';
import { GoogleGenAI } from "@google/genai";

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ztslohtd',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Must be false for locking to work
  token: process.env.SANITY_WRITE_TOKEN,
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function blocksToText(blocks: any[] = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { postId, forceRegenerate } = await req.json();

    // 1. Fetch current state
    const post = await sanity.fetch(
      `*[_type == "blog" && _id == $id][0]{ _id, title, content, aiSummary, isGenerating }`,
      { id: postId }
    );

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    // 2. CHECK: Is someone else already working on this?
    if (post.isGenerating) {
      console.log('[LOCK] Generation in progress by another user.');
      // Return 202 Accepted = "We are working on it, come back soon"
      return new Response(JSON.stringify({ status: 'processing', message: 'Summary is being generated...' }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. CACHE HIT: If we have a summary and aren't forcing, return it.
    if (post.aiSummary && !forceRegenerate) {
      return new Response(JSON.stringify({ summary: post.aiSummary }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. ACQUIRE LOCK: Set isGenerating = true
    // This tells everyone else to wait
    await sanity.patch(postId).set({ isGenerating: true }).commit();
    console.log('[START] Lock acquired. Generating...');

    try {
      // 5. DO THE HEAVY WORK (AI Call)
      const articleText = blocksToText(post.content);
      const prompt = `
        You are an expert editor. 
        Read this article: "${post.title}"
        Task: Create a "TL;DR" summary with exactly 3 to 5 bullet points.
        Article Text: ${articleText.substring(0, 12000)}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest", 
        contents: prompt,
        config: { responseMimeType: 'text/plain' }
      });

      const summaryText = response.text;

      // 6. SAVE & RELEASE LOCK
      await sanity
        .patch(postId)
        .set({ 
          aiSummary: summaryText,
          isGenerating: false // Unlock!
        })
        .commit();
        
      console.log('[DONE] Saved and Unlocked.');

      return new Response(JSON.stringify({ summary: summaryText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (innerError) {
      // CRITICAL: If AI fails, we must release the lock or it stays stuck forever!
      await sanity.patch(postId).set({ isGenerating: false }).commit();
      throw innerError;
    }

  } catch (error: any) {
    console.error('Function Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}