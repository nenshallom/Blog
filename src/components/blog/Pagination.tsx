// src/components/blog/Pagination.tsx
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPosts, 
  postsPerPage, 
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full border transition-colors ${
          currentPage === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-800 dark:text-gray-700"
            : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
        aria-label="Previous Page"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full border transition-colors ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-800 dark:text-gray-700"
            : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
        aria-label="Next Page"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}