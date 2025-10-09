// src/components/blog/BlogFilterBar.tsx
import Select from '@components/ui/Select' // Import our new Select component

interface BlogFilterBarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortOptions: string[]
  selectedSort: string
  onSortChange: (sort: string) => void
}

export default function BlogFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOptions,
  selectedSort,
  onSortChange,
}: BlogFilterBarProps) {
  return (
    <div className="flex gap-2 items-center justify-between lg:justify-start w-full lg:w-fit mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      {/* Filter */}
      <div className="w-full text-xs">
        <Select
          label="Category"
          options={categories}
          selected={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>

      {/* Sort */}
      <div className="w-full text-xs">
        <Select
          label="Sort by"
          options={sortOptions}
          selected={selectedSort}
          onChange={onSortChange}
        />
      </div>
    </div>
  )
}