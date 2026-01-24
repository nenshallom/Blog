import { Link } from 'react-router-dom';
import type { BlogPost } from 'src/data/types';
import { GoClock } from "react-icons/go";

interface EditorsSidebarProps {
  posts: BlogPost[];
}

export default function EditorsSidebar({ posts }: EditorsSidebarProps) {
  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="p-2 text-xl font-bold text-gray-900 dark:text-white mb-2">
        More from Editor&apos;s Pick
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-start group p-2 rounded-lg transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-28 h-18 object-fill rounded-md mr-2"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2 ">
                  
                  <GoClock />
                  <span>{post.readTime || '5 min'} min read</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}