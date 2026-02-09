import SEO from "@components/Seo";
import Hero from "./Hero";
import Latest from "./Latest";
import AIConsultantSection from "./AIConsultantSection";
import EditorsPickSection from "../sections/EditorsPick/EditorsPickSection";
import DeepDiveSection from "../sections/DeepDive/DeepDiveSection";
import CategorySection from "./CategorySection";

// Import the specific queries we wrote in Step 1
import { 
  getBusinessesUsingAIPosts,
  getAIWithoutStressPosts,
  getAIForDailyBusinessPosts,
  getAIForMoneyAndGrowthPosts,
  getMindsetPosts
} from "@my-sanity/queries";

export default function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      
      {/* 1. Latest (Contains mix of everything) */}
      <Latest />

      {/* 2. Editors Pick (Your custom layout) */}
      <EditorsPickSection />

      {/* 3. Businesses Using AI */}
      <CategorySection 
        title="Businesses Using AI" 
        fetchData={getBusinessesUsingAIPosts} 
        bgColor="bg-gray-50 dark:bg-gray-800/50" // Alternating color
      />

      {/* 4. Deep Dive (Your custom layout) */}
      <DeepDiveSection />

      {/* 5. AI Without Stress */}
      <CategorySection 
        title="AI Without Stress" 
        fetchData={getAIWithoutStressPosts}
      />

      {/* 6. AI Consultant (Good place to break up the reading) */}
      <AIConsultantSection />

      {/* 7. AI for Daily Business */}
      <CategorySection 
        title="AI for Daily Business" 
        fetchData={getAIForDailyBusinessPosts}
        bgColor="bg-gray-50 dark:bg-gray-800/50"
      />

      {/* 8. AI for Money and Growth */}
      <CategorySection 
        title="AI for Money & Growth" 
        fetchData={getAIForMoneyAndGrowthPosts}
      />

      {/* 9. Mindset and Modern Entrepreneurship */}
      <CategorySection 
        title="Mindset & Entrepreneurship" 
        fetchData={getMindsetPosts}
        bgColor="bg-green-50/50 dark:bg-green-900/10" // Special tint for mindset
      />
    </>
  );
}