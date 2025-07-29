// src/sections/blog/BlogFilterBar.tsx
interface BlogFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogFilterBarProps) {
  const sortOptions = ["Newest", "Oldest", "Popular"];

  return (
    <div className="flex flex-col md:flex-row items-left justify-left gap-4 mb-8">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="category"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded px-3 py-2 bg-white dark:bg-gray-800 text-sm border dark:border-gray-700 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort - (Optional: You can later add props to control sort too) */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="sort"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Sort by:
        </label>
        <select
          id="sort"
          defaultValue="Newest"
          className="rounded px-3 py-2 bg-white dark:bg-gray-800 text-sm border dark:border-gray-700 focus:outline-none"
        >
          {sortOptions.map((sort) => (
            <option key={sort}>{sort}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
