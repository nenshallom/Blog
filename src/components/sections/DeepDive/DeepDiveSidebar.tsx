// src/components/sections/DeepDive/DeepDiveSidebar.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "src/data/types";
// import { BookOpen } from "lucide-react";

interface DeepDiveSidebarProps {
  post: BlogPost;
}

export default function DeepDiveSidebar({ post }: DeepDiveSidebarProps) {
  const { title, excerpt, imageUrl, publishedAt, readTime, authorName, slug } = post;

  return (
    <Link
      to={`/blog/${slug}`}
      className="flex items-start group hover:text-blue-500 transition-colors"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
          {title}
        </h4>
        {/* FIX: Added excerpt here */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 line-clamp-2">
          {excerpt}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {authorName} • {new Date(publishedAt).toLocaleDateString()} • {readTime} min
        </p>
      </div>
    </Link>
  );
}