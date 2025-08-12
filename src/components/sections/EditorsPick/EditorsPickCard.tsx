// src/components/sections/EditorsPick/EditorsPickCard.tsx
import { Link } from 'react-router-dom';
import type { BlogPost } from 'src/data/types';
import { User } from 'lucide-react'; // Import icons

interface EditorsPickCardProps {
  post: BlogPost;
}

export default function EditorsPickCard({ post }: EditorsPickCardProps) {
  const { title, excerpt, imageUrl, publishedAt, category, readTime, authorName, slug } = post;
  
  return (
    <Link to={`/blog/${slug}`} className="block relative group">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        {/* FIX: Added excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {/* FIX: Added author name and read time */}
          <User size={14} className="mr-1" />
          <span>{authorName}</span>
          {/* HIDE CATEGORY */}
          {/* <span className="mx-2">•</span>  */}
          {/* <span>{category}</span> */}
          <span className="mx-2">•</span>
          {/* FIX: Dynamically display readTime and add "min read" */}
          <span>{readTime ? `${readTime} min read` : '5 min read'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}