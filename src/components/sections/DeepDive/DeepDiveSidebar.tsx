// src/components/sections/DeepDive/DeepDiveSidebar.tsx

import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface DeepDiveSidebarProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function DeepDiveSidebar({
  title,
  excerpt,
  imageUrl,
  author,
  date,
  readTime,
  slug,
}: DeepDiveSidebarProps) {
  return (
    <Link
      to={`/blog/${slug}`}
      // Removed hover:animate-pulse.
      // Retained transition and hover:scale for sleekness via Tailwind CSS.
      className="flex gap-4 items-center border-b border-gray-200 dark:border-gray-700 pb-5 transition duration-300 hover:scale-[1.015] hover:shadow-md group"
    >
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:underline line-clamp-2">
          {title}
        </h4>

        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {excerpt}
        </p>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2 mt-2">
          <BookOpen size={14} />
          <span>{author}</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span>{readTime}</span>
        </div>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0 group-hover:brightness-95 transition duration-300"
      />
    </Link>
  );
}