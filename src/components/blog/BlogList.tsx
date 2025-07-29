// src/sections/blog/BlogList.tsx
import ArticleCard from "./ArticleCard";
import type { BlogPost } from "../../data/types";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
