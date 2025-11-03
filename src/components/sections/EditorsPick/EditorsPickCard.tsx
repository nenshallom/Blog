// src/components/sections/EditorsPick/EditorsPickCard.tsx
import { Link } from 'react-router-dom';
import type { BlogPost } from 'src/data/types';
import { GoClock } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import { motion } from 'framer-motion'; // <-- New import

interface EditorsPickCardProps {
  post: BlogPost;
}

export default function EditorsPickCard({ post }: EditorsPickCardProps) {
  const { title, excerpt, imageUrl, readTime, slug } = post;
  
  return (
    <motion.div // <-- Wrapped the Link in motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-lg shadow-md overflow-hidden group" // <-- Added className for consistent styling
    >
      <Link to={`/blog/${slug}`} className="block relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="p-4">
          <h3 className="text-md font-bold text-gray-900 dark:text-white transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex text-xs items-center text-gray-500 dark:text-gray-400 gap-2 mt-4">
            <GoClock />
            <span>{readTime ? `${readTime} min read` : '5 min read'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}