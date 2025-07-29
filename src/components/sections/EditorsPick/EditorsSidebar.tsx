// src/components/sections/EditorsPick/EditorsSidebar.tsx
// This file is used by EditorsPickSection.tsx

import { Link } from "react-router-dom";

interface EditorsPickSidebarProps {
  title: string;
  imageUrl: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function EditorsPickSidebar({
  title,
  imageUrl,
  date,
  readTime,
  slug,
}: EditorsPickSidebarProps) {
  return (
    <Link to={`/blog/${slug}`}>
      <div className="flex gap-3 items-start py-3 transition duration-300 hover:scale-[1.015] hover:shadow-md group"> {/* Removed border-b and last:border-b-0 */}
        {/* Thumbnail */}
        <img
          src={imageUrl}
          alt={title}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover flex-shrink-0"
        />

        {/* Content */}
        <div className="flex flex-col justify-center">
          {/* Title */}
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 hover:underline">
            {title}
          </h4>

          {/* Meta Info */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <span>{date}</span>
            <span className="mx-1">/</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}