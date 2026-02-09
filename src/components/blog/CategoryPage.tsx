import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryPosts, getLatestPosts } from "@my-sanity/queries"; 
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination"; 
import type { BlogPost } from "src/data/types";
import SEO from "@components/Seo";
import { ArrowLeft } from "lucide-react";

// Helper to format slug
const formatTitle = (slug: string) => 
  slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // State for content and pagination
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 9;

  useEffect(() => {
    async function fetch() {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
        
        // Handle "Latest" special case (simulated category)
        if (categorySlug === 'latest') {
             const allLatest = await getLatestPosts(50); 
             setPosts(allLatest.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
             setTotalPosts(allLatest.length);
        } else {
             // Standard Category Pagination
             const result = await getCategoryPosts(categorySlug, currentPage, postsPerPage);
             setPosts(result.posts);
             setTotalPosts(result.total);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [categorySlug, currentPage]); 

  const displayTitle = categorySlug ? formatTitle(categorySlug) : "Category";

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 mt-0">
      <SEO title={`${displayTitle} - Blog`} description={`Read articles about ${displayTitle}`} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mb-4 transition">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>
          <div className="items-baseline">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {displayTitle} Articles
             </h1>
          </div>
          <p className="text-gray-300 text-md">
            Browsing {totalPosts} articles
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-400">Loading articles...</div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination Control */}
            <Pagination 
                currentPage={currentPage}
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500">No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}