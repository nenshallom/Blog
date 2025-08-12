// src/components/sections/EditorsPick/EditorsSidebar.tsx
import { Link } from 'react-router-dom';
import type { BlogPost } from 'src/data/types';
// import { BookOpen } from 'lucide-react';

interface EditorsSidebarProps {
  posts: BlogPost[];
}

export default function EditorsSidebar({ posts }: EditorsSidebarProps) {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        More from Editor&apos;s Pick
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-start group hover:text-blue-500 transition-colors"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h4>
                {/* FIX: Added excerpt here */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {post.authorName} • {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}