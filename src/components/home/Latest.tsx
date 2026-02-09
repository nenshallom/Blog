// src/components/home/Latest.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleCard from "@components/blog/ArticleCard";
import { getLatestPosts } from "@my-sanity/queries"; // <-- Use the efficient query
import type { BlogPost } from "src/data/types";

export default function Latest() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch only the latest 6 posts directly from Sanity
        const data = await getLatestPosts(3);
        setLatestPosts(data);
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
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-medium mt-2 text-left text-gray-900 dark:text-white">
          Latest Articles
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/blog">
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition shadow-lg">
            View All Latest →
          </button>
        </Link>
      </div>
    </section>
  );
}