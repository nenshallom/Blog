// src/data/types.ts

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  readTime?: string;
  authorName?: string;
  authorImageUrl?: string;
  content?: any;
  author?: {
    name: string;
    imageUrl: string;
  };
}