import { sanity } from './client';
import type { BlogPost } from '../data/types';

// ==========================================
// 1. REUSABLE FRAGMENTS (DRY Principle)
// ==========================================
// We define the fields once so we don't have to type them 10 times.
// If you ever want to add a field (e.g. "tags"), you only do it here.
const postFields = `
  _id,
  title,
  excerpt,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url,
  "category": categories[0]->title,
  "readTime": round(length(pt::text(content)) / 5 / 200),
  publishedAt,
  "authorName": author->name,
  "authorImageUrl": author->image.asset->url
`;

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// Generic function to fetch posts by ANY category slug
async function getPostsByCategory(categorySlug: string, limit = 4): Promise<BlogPost[]> {
  // Uses the limit passed in
  const query = `
    *[_type == "blog" && $categorySlug in categories[]->slug.current] 
    | order(coalesce(publishedAt, _createdAt) desc) [0...${limit}] {
      ${postFields}
    }
  `;
  return await sanity.fetch(query, { categorySlug });
}
// ==========================================
// 3. MAIN EXPORTS
// ==========================================

// LATEST: Fetches the most recent articles from ANY section
export async function getLatestPosts(limit = 6): Promise<BlogPost[]> {
  const query = `
    *[_type == "blog"] | order(coalesce(publishedAt, _createdAt) desc) [0...${limit}] {
      ${postFields}
    }
  `;
  return await sanity.fetch(query);
}

// BACKWARD COMPATIBILITY: Keeps your existing code working
export const getAllBlogPosts = () => getLatestPosts(100);

// SINGLE POST: Detailed view for the blog post page
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    ${postFields},
    content,
    aiSummary,  
    "author": author->{
      name,
      "imageUrl": image.asset->url,
    },
  }`;
  return await sanity.fetch(query, { slug });
}

// ==========================================
// 4. SPECIFIC SECTION FETCHERSn 
// ==========================================

export async function getBusinessesUsingAIPosts(limit = 4): Promise<BlogPost[]> {
  return getPostsByCategory('businesses-using-ai', limit);
}

export async function getAIWithoutStressPosts(limit = 4): Promise<BlogPost[]> {
  return getPostsByCategory('ai-without-stress', limit);
}

export async function getAIForDailyBusinessPosts(limit = 4): Promise<BlogPost[]> {
  return getPostsByCategory('ai-for-daily-business', limit);
}

export async function getAIForMoneyAndGrowthPosts(limit = 4): Promise<BlogPost[]> {
  return getPostsByCategory('ai-for-money-and-growth', limit);
}

export async function getMindsetPosts(limit = 4): Promise<BlogPost[]> {
  return getPostsByCategory('mindset-and-modern-entrepreneurship', limit);
}
// ==========================================
// 5. SPECIAL LAYOUT FETCHERS
// ==========================================

// Deep Dive (Returns 1 Feature + 3 Side posts)
export async function getDeepDivePosts(): Promise<{ feature: BlogPost | null; sidePosts: BlogPost[] }> {
  const query = `
    {
      "feature": *[_type == "blog" && "deep-dive" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc) [0] {
        ${postFields}
      },
      "sidePosts": *[_type == "blog" && "deep-dive" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc) [1...4] {
        ${postFields}
      }
    }
  `;
  return await sanity.fetch(query);
}

// Editor's Pick (Returns 2 Main + 3 Complementary)
export async function getEditorsPickPosts(): Promise<{ main: BlogPost[]; complementary: BlogPost[] }> {
  const query = `
    {
      "main": *[_type == "blog" && "editors-pick" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc) [0...2] {
        ${postFields}
      },
      "complementary": *[_type == "blog" && "editors-pick" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc) [2...5] {
        ${postFields}
      }
    }
  `;
  return await sanity.fetch(query);
}

// NEW: Fetch ALL posts for a specific category (for the Category Page)
export async function getCategoryPosts(categorySlug: string, page: number = 1, limit: number = 9): Promise<{ posts: BlogPost[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const query = `
    {
      "total": count(*[_type == "blog" && $categorySlug in categories[]->slug.current]),
      "posts": *[_type == "blog" && $categorySlug in categories[]->slug.current] 
        | order(coalesce(publishedAt, _createdAt) desc) [${start}...${end}] {
        ${postFields}
      }
    }
  `;
  
  return await sanity.fetch(query, { categorySlug });
}