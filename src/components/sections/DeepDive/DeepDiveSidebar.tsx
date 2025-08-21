// src/components/sections/DeepDive/DeepDiveSidebar.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "src/data/types";
import { GoClock } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";

interface DeepDiveSidebarProps {
  post: BlogPost;
}

export default function DeepDiveSidebar({ post }: DeepDiveSidebarProps) {
  const { title, excerpt, imageUrl, readTime, authorName, slug } = post;

  return (
    <Link
      to={`/blog/${slug}`}
      className="flex items-start p-2 rounded-lg group transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white transition-colors line-clamp-1">
          {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">
          {excerpt}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
          <HiUserCircle />
          <span>{authorName || 'Author'}</span>
          <GoClock />
          <span>{readTime || '5 min read'} min</span>
        </div>
      </div>
    </Link>
  );
}