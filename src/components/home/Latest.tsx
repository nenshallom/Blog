// src/components/sections/home/Latest.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "@components/blog/ArticleCard";
import { getAllBlogPosts } from "@my-sanity/queries";
import type { BlogPost } from "src/data/types";

export default function Latest() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllBlogPosts();
        setLatestPosts(allPosts.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center text-gray-500">Loading latest posts...</div>
      </section>
    );
  }

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-left">Latest</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/blog">
          <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
            View All Latest →
          </button>
        </Link>
      </div>
    </section>
  );
}