import { Link } from "react-router-dom";

interface EditorPickCardProps {
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
  imageUrl: string;
  likes?: number; // Made optional as per new requirement
  comments?: number; // Made optional as per new requirement
  readTime: string;
}

export default function EditorPickCard({
  title,
  excerpt,
  slug,
  tags,
  imageUrl,
  readTime,
}: EditorPickCardProps) {
  return (
    <Link to={`/blog/${slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 group">
        {/* Image Section */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-52 object-cover group-hover:brightness-95 transition duration-300"
          />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/80 text-sm px-3 py-1 rounded-full font-medium text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 leading-snug group-hover:underline">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {excerpt}
          </p>

          {/* Footer -  */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}