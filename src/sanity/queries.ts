// src/sanity/queries.ts
import { sanity } from './client';
import type { BlogPost } from '../data/types';

// Fetch all blog posts for the main blog list
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "blog"] | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url,
      "category": categories[0]->title,
      "readTime": round(length(pt::text(content)) / 5 / 200),
      publishedAt,
      "authorName": author->name,
    }
  `;
  return await sanity.fetch(query);
}

// Fetch a single blog post by its slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    "category": categories[0]->title,
    "readTime": round(length(pt::text(content)) / 5 / 200),
    publishedAt,
    content,
    "author": author->{
      name,
      "imageUrl": image.asset->url,
    },
  }`;
  return await sanity.fetch(query, { slug });
}

// Fetch posts for the "Deep Dive" section
export async function getDeepDivePosts(): Promise<{ feature: BlogPost | null; sidePosts: BlogPost[] }> {
  const query = `
    {
      "feature": *[_type == "blog" && "deep-dive" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc) [0] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        "category": categories[0]->title,
        publishedAt,
        "readTime": round(length(pt::text(content)) / 5 / 200),
        "authorName": author->name,
      },
      "sidePosts": *[_type == "blog" && "deep-dive" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc) [1...4] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        "category": categories[0]->title,
        publishedAt,
        "authorName": author->name,
        "readTime": round(length(pt::text(content)) / 5 / 200),
      }
    }
  `;
  return await sanity.fetch(query);
}

// Fetch posts for the "Editor's Pick" section
export async function getEditorsPickPosts(): Promise<{ main: BlogPost[]; complementary: BlogPost[] }> {
  const query = `
    {
      "main": *[_type == "blog" && "editors-pick" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc) [0...2] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        "category": categories[0]->title,
        publishedAt,
        "readTime": round(length(pt::text(content)) / 5 / 200),
        "authorName": author->name,
      },
      "complementary": *[_type == "blog" && "editors-pick" in categories[]->slug.current] | order(coalesce(publishedAt, _createdAt) desc, _createdAt desc) [2...5] {
        _id,
        title,
        excerpt,
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        publishedAt,
        "readTime": round(length(pt::text(content)) / 5 / 200),
        "category": categories[0]->title,
        "authorName": author->name,
      }
    }
  `;
  return await sanity.fetch(query);
}