// src/components/sections/DeepDive/DeepDiveSection.tsx

import DeepDiveCard from "./DeepDiveCard";
import DeepDiveSidebar from "./DeepDiveSidebar";
// Assuming this path to your allPosts data is correct
import { allPosts } from "../../../data/blog";

export default function DeepDiveSection() {
  const feature = allPosts.find(
    (p) => p.slug === "my-journey-into-frontend-development"
  );

  const sidePosts = allPosts.filter((p) =>
    [
      "jennifer-aniston-depression-new-album",
      "corsair-hs80-headset-review",
      "self-driving-cars-everything",
    ].includes(p.slug)
  );

  // --- TEMPORARY DEBUGGING START ---
  // Add console logs here to check if 'feature' is found
  console.log("DeepDiveSection: allPosts data:", allPosts);
  console.log("DeepDiveSection: Looking for slug 'impact-of-covid-on-airport-business'");
  console.log("DeepDiveSection: Found feature post:", feature);
  // --- TEMPORARY DEBUGGING END ---

  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Deep Dive. <span className="text-blue-600">In depth Understanding</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Featured Card (55%) */}
        <div className="lg:w-[55%] w-full">
          {feature && ( // This condition is crucial for rendering
            <DeepDiveCard
              post={feature} // <--- This should be 'post={feature}'
            />
          )}
        </div>

        {/* Right Sidebar Cards (45%) */}
        <div className="lg:w-[45%] w-full space-y-6">
          {sidePosts.map((post) => (
            <DeepDiveSidebar
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}