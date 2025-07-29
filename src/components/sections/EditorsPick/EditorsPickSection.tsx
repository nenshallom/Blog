// src/components/sections/EditorsPick/EditorsPickSection.tsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EditorsPickCard from "./EditorsPickCard";
import EditorsPickSidebar from "./EditorsSidebar";
import { allPosts } from "../../../data/blog"; // Assuming allPosts is the source

export default function EditorsPickSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-10% 0px",
  });

  // Pick the two main featured articles
  // You can customize which posts appear here, for example, by slug or a 'featured' flag in BlogPost
  const mainFeaturedArticles = allPosts.filter((p) =>
    ["my-journey-into-frontend-development", "setting-up-react-tailwind-project"].includes(p.slug)
  ).slice(0, 2); // Ensure we only get up to 2

  // Pick three complementary articles for the list
  // Adjust the slugs as needed for your desired posts
  const complementaryArticles = allPosts.filter((p) =>
    ["dark-mode-in-tailwind", "react-performance-memoization", "ui-ux-principles-web-design"].includes(p.slug)
  ).slice(0, 3); // Ensure we only get up to 3

  return (
    <section ref={ref} className="py-16 px-4 md:px-8  max-w-5xl mx-auto">
      {/* Section Title - Aligned Left */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-left" // Changed to text-left
      >
        Editor's Picks. <span className="text-blue-600">The best of our blog</span>
      </motion.h2>

      <div className="flex flex-col gap-10">
        {/* Main Featured Articles - Two Cards Side-by-Side (or stacked on small screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainFeaturedArticles.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <EditorsPickCard
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                readTime={post.readTime}
                tags={[post.category]}
                slug={post.slug}
              />
            </motion.div>
          ))}
        </div>

        {/* Complementary Articles - List of 3, below the main cards */}
        <div className="space-y-4 pt-4"> {/* Added pt-4 for spacing between sections */}
          {complementaryArticles.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.3 * i, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <EditorsPickSidebar
                title={post.title}
                imageUrl={post.imageUrl}
                date={post.date}
                readTime={post.readTime}
                slug={post.slug}
                // Removed explicit border-b from here, handled in the component itself
                // (Assuming EditorsPickSidebar is modified as per instruction below)
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}