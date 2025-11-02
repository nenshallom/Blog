import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import type { BlogPost } from "src/data/types";
import { GoClock } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";

interface ArticleCardProps {
  post: BlogPost;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const { title, excerpt, imageUrl, slug, readTime, authorName } = post;

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });


  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
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
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-lg shadow-md bg-white dark:bg-gray-800 overflow-hidden group"
    >
      <Link to={`/blog/${slug}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:brightness-95 transition duration-300"
        />

        <div className="p-2">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2 mt-4">
            <HiUserCircle className="text-[#184E59]" />
            <span>{authorName || 'Author'}</span>
            <GoClock className="text-[#184E59]"/>
            <span>{readTime || '5 min read'} min</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}