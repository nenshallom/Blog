// src/components/blog/BlogPage.tsx
import SEO from "@components/Seo";
import ScrollableCategorySection from "./ScrollableCategorySection";
import {
  getLatestPosts,
  getEditorsPickPosts,
  getBusinessesUsingAIPosts,
  getAIWithoutStressPosts,
  getAIForDailyBusinessPosts,
  getAIForMoneyAndGrowthPosts,
  getMindsetPosts
} from "@my-sanity/queries";

export default function BlogPage() {
  return (
    <>
      <SEO 
        title="Blog - Code and Cultivate" 
        description="Explore our latest articles on AI, Business, and Mindset." 
      />
      
      <div className="bg-white dark:bg-gray-900 min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center">
            Your <span className="text-green-500">Special</span> Blog
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Swipe to see the latest articles in each category.
          </p>
        </div>

        {/* 1. Latest Articles (Note: We use a dummy slug 'latest' or just link to /blog for now) */}
        <ScrollableCategorySection
          title="Latest Articles"
          categorySlug="latest" // You might want to handle this specifically or map it to a 'all' query
          fetchData={getLatestPosts}
        />

        {/* 2. Editors Pick */}
        <ScrollableCategorySection
          title="Editor's Pick"
          categorySlug="editors-pick"
          // Adapter: getEditorsPickPosts returns an object {main, complementary}, 
          // but our component expects an array. We combine them here.
          fetchData={async (limit) => {
            const data = await getEditorsPickPosts();
            return [...data.main, ...data.complementary].slice(0, limit);
          }}
        />

        {/* 3. Standard Categories */}
        <ScrollableCategorySection
          title="Businesses Using AI"
          categorySlug="businesses-using-ai"
          fetchData={getBusinessesUsingAIPosts}
        />

        <ScrollableCategorySection
          title="AI Without Stress"
          categorySlug="ai-without-stress"
          fetchData={getAIWithoutStressPosts}
        />

        <ScrollableCategorySection
          title="AI for Daily Business"
          categorySlug="ai-for-daily-business"
          fetchData={getAIForDailyBusinessPosts}
        />

        <ScrollableCategorySection
          title="AI for Money & Growth"
          categorySlug="ai-for-money-and-growth"
          fetchData={getAIForMoneyAndGrowthPosts}
        />

        <ScrollableCategorySection
          title="Mindset & Entrepreneurship"
          categorySlug="mindset-and-modern-entrepreneurship"
          fetchData={getMindsetPosts}
        />
      </div>
    </>
  );
}