// src/components/sections/DeepDive/DeepDiveCard.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "src/data/types";
import { GoClock } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";

interface DeepDiveCardProps {
  post: BlogPost;
}

export default function DeepDiveCard({ post }: DeepDiveCardProps) {
  const { title, excerpt, imageUrl, readTime, authorName } = post;

  return (
    <Link to={`/blog/${post.slug}`} className="block relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg">
        <h3 className="text-white text-md font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{excerpt}</p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
          <HiUserCircle />
          <span>{authorName || 'Author'}</span>
          <GoClock />
          <span>{readTime || '5 min read'} min read </span>
        </div>
      </div>
    </Link>
  );
}