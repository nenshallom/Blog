import { Link } from "react-router-dom";
import type { BlogPost } from "../../../data/types";
import { motion, useAnimation } from "framer-motion"; // Import motion and useAnimation
import { useInView } from "react-intersection-observer"; // Import useInView
import { useEffect } from "react"; // Import useEffect

interface DeepDiveCardProps {
  post: BlogPost;
}

export default function DeepDiveCard({ post }: DeepDiveCardProps) {
  const { title, excerpt, imageUrl, author, date, readTime, avatarUrl, slug } = post;

  const controls = useAnimation(); // Initialize useAnimation
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true }); // Use useInView

  // Effect to start animation when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div // Wrap with motion.div for entry animation
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 }, // Start slightly below and invisible
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6, // Smooth duration
            ease: "easeOut", // Easing for a sleek feel
          },
        },
      }}
      // Use whileHover for a more controlled hover animation
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Transition for hover effect
      className="col-span-1 cursor-pointer rounded-xl bg-white dark:bg-gray-800 overflow-hidden shadow" // Remove old hover classes
    >
      <Link to={`/blog/${slug}`} className="block group">
        {/* Thumbnail */}
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl w-full h-56 sm:h-72 object-cover mb-4 group-hover:brightness-95 transition duration-300"
        />

        <div className="p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-snug mb-2 group-hover:underline">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
          <img
            src={avatarUrl}
            alt={author}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span>{author}</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span>{readTime}</span>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}