import { useEffect, useState } from "react";
import type { BlogPost } from "src/data/types";
import { Link } from "react-router-dom";
import { GoClock } from "react-icons/go";

interface CategorySectionProps {
  title: string;
  fetchData: (limit?: number) => Promise<BlogPost[]>;
  viewAllLink?: string;
  bgColor?: string;
}

export default function CategorySection({ 
  title, 
  fetchData, 
  viewAllLink,
  bgColor = "bg-white dark:bg-gray-900" 
}: CategorySectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchData(5); 
        setPosts(data);
      } catch (error) {
        console.error(`Failed to load section: ${title}`, error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [fetchData, title]);

  if (loading) return null; 
  if (posts.length === 0) return null; 

  const mainPosts = posts.slice(0, 2);
  const sidebarPosts = posts.slice(2, 5);

  return (
    <section className={`py-16 px-4 border-t border-gray-100 dark:border-gray-800 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              to={viewAllLink}
              className="text-sm font-semibold text-green-600 hover:text-green-700 transition flex items-center gap-1"
            >
              View all <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Main Featured Posts (2/3 width) */}
          <div className="lg:col-span-2 space-y-10">
            {mainPosts.map((post) => (
              <FeaturedCard key={post._id} post={post} />
            ))}
          </div>

          {/* RIGHT COLUMN: Sidebar List (1/3 width) */}
          <div className="lg:col-span-1">
            {sidebarPosts.length > 0 && (
              <div className="lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-8 h-full">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                  More in {title}
                </h3>
                <div className="space-y-6">
                  {sidebarPosts.map((post) => (
                    <SidebarLink key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// SUB-COMPONENT: Large Featured Card
// ==========================================
function FeaturedCard({ post }: { post: BlogPost }) {
  const { title, excerpt, imageUrl, slug, authorName, publishedAt, readTime, category } = post;

  return (
    <Link to={`/blog/${slug}`} className="group flex flex-col md:flex-row gap-6 items-start">
      {/* Image */}
      <div className="w-full md:w-5/12 overflow-hidden rounded-xl shadow-sm">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
              {category || "Article"}
            </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
          {excerpt}
        </p>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
            <span className="font-medium text-gray-900 dark:text-gray-200">{authorName}</span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
                 <GoClock className="w-3 h-3" />
                 <span>{readTime || '5 min'}</span>
            </div>
             <span className="text-gray-300">•</span>
            <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric"
                })}
            </time>
        </div>
      </div>
    </Link>
  );
}

// ==========================================
// SUB-COMPONENT: Small Sidebar Link
// ==========================================
function SidebarLink({ post }: { post: BlogPost }) {
  const { title, slug, publishedAt } = post;

  return (
    <Link to={`/blog/${slug}`} className="block group border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0">
      <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-colors mb-2 line-clamp-2 leading-snug">
        {title}
      </h4>
      <time className="text-xs text-gray-400">
        {new Date(publishedAt).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric"
        })}
      </time>
    </Link>
  );
}