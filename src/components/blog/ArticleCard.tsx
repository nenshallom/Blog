// src/components/blog/ArticleCard.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/types"; 
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type ArticleCardProps = BlogPost;

export default function ArticleCard({
  title,
  excerpt,
  date,
  category,
  imageUrl,
  slug,
  readTime,
}: ArticleCardProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true }); // CHANGE: triggerOnce: true

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    // REMOVED: else { controls.start("hidden"); } - We want it to stay visible after animating in
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      // CHANGE: Use whileHover for consistent Framer Motion hover effects
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Transition for hover
      className="rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden group" // REMOVED: old hover classes
    >
      <Link to={`/blog/${slug}`}>
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:brightness-95 transition duration-300"
        />

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {category}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-tight group-hover:underline">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            <span>{date}</span>
            <span className="mx-1">•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}