// src/components/sections/DeepDive/DeepDiveCard.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "src/data/types";

interface DeepDiveCardProps {
  post: BlogPost;
}

export default function DeepDiveCard({ post }: DeepDiveCardProps) {
  // FIX: Added 'authorName' and 'excerpt' to the destructuring
  const { title, excerpt, imageUrl, category, publishedAt, readTime, authorName } = post;

  return (
    <Link to={`/blog/${post.slug}`} className="block relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        {/* FIX: Added a paragraph to display the excerpt */}
        <p className="text-gray-200 text-sm mb-2 line-clamp-2">{excerpt}</p>
        <p className="text-gray-200 text-sm">
          {/* FIX: Added authorName to the meta line */}
          {authorName} • {category} • {new Date(publishedAt).toLocaleDateString()} • {readTime} min
        </p>
      </div>
    </Link>
  );
}