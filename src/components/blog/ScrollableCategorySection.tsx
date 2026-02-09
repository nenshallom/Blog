// src/components/blog/ScrollableCategorySection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import type { BlogPost } from "src/data/types";
import { ArrowRight } from "lucide-react";

interface ScrollableCategorySectionProps {
  title: string;
  categorySlug: string; // Needed for the "View Category" link
  fetchData: (limit: number) => Promise<BlogPost[]>;
}

export default function ScrollableCategorySection({
  title,
  categorySlug,
  fetchData,
}: ScrollableCategorySectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch exactly 7 posts as requested
        const data = await fetchData(7);
        setPosts(data);
      } catch (e) {
        console.error(`Failed to load ${title}`, e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fetchData, title]);

  if (loading) return <div className="py-12 text-center">Loading {title}...</div>;
  if (posts.length === 0) return null;

  return (
    <section className="py-10 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Title + View Category Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <Link
            to={`/blog/category/${categorySlug}`}
            className="group flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition"
          >
            View Category
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* We use negative margins to allow scrolling to touch the screen edge on mobile */}
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory gap-6">
            {posts.map((post) => (
              <div 
                key={post._id} 
                className="flex-none w-[280px] md:w-[320px] snap-center"
              >
                <ArticleCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}