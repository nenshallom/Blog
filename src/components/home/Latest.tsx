// src/components/sections/home/Latest.tsx

import { Link } from "react-router-dom";
import ArticleCard from "../blog/ArticleCard";
import { allPosts } from "../../data/blog";

export default function Latest() {
  const latestPosts = allPosts.slice(0, 3); // You can also filter based on category or tag

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-left">Latest</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/blog">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            View All Latest →
          </button>
        </Link>
      </div>
    </section>
  );
}
