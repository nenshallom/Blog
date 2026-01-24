import { createClient } from '@sanity/client';
import { GoogleGenAI } from "@google/genai";

// 1. Setup Sanity (Read-Only is fine for this one, but we use the token to be safe)
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ztslohtd',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, 
  token: process.env.SANITY_WRITE_TOKEN,
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: Request) {
  // CORS
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
    const { userQuery } = await req.json();

    if (!userQuery) {
      return new Response(JSON.stringify({ error: 'Query is required' }), { status: 400 });
    }

    console.log(`[RECOMMEND] User asking: "${userQuery}"`);

    // 1. FETCH ALL POST METADATA
    const allPosts = await sanity.fetch(
      `*[_type == "blog"]{ 
        title, 
        excerpt, 
        "slug": slug.current,
        "category": categories[0]->title 
      }`
    );

    console.log(`[CONTEXT] Found ${allPosts.length} articles to reference.`);

    // 2. BUILD THE PROMPT (Context Injection)
    const libraryContext = allPosts.map((p: any) => 
      `- Title: "${p.title}" (Category: ${p.category})\n  Summary: ${p.excerpt}\n  Link: /blog/${p.slug}`
    ).join('\n\n');

    const prompt = `
      You are an expert AI Business Consultant for a tech blog.
      
      YOUR LIBRARY OF CONTENT:
      ${libraryContext}

      USER QUESTION:
      "${userQuery}"

      TASK:
      Based ONLY on the library above, recommend 2 to 3 articles that best help the user.
      For each recommendation:
      1. Provide the exact Title.
      2. Explain in 1 sentence why it fits their specific business need.
      3. Provide the Slug/Link.
      
      If no articles fit, politely suggest they check the "Latest" section instead.
      Return the answer in JSON format: 
      { 
        "message": "Friendly advice intro...", 
        "recommendations": [ { "title": "...", "reason": "...", "slug": "..." } ] 
      }
    `;

    // 3. CALL GEMINI
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest", 
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const result = response.text;
    console.log('[DONE] Recommendation generated.');

    return new Response(result, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Recommend Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}