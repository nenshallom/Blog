// src/components/blog/BlogPage.tsx
import { useEffect, useState, useMemo } from 'react'
import BlogFilterBar from './BlogFilterBar'
import BlogList from './BlogList'
import Pagination from './Pagination'
import { getAllBlogPosts } from '@my-sanity/queries' 
import type { BlogPost } from 'src/data/types' 

const POSTS_PER_PAGE = 6
const SORT_OPTIONS = ['Newest', 'Oldest']

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedSort, setSelectedSort] = useState('Newest')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllBlogPosts()
        setPosts(allPosts)
        setLoading(false)

        // Extract and set categories dynamically
        const uniqueCategories = [
          'All',
          ...new Set(allPosts.map((post) => post.category)),
        ]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Memoize the filtered and sorted posts to avoid re-calculating on every render
  const processedPosts = useMemo(() => {
    let filtered =
      selectedCategory === 'All'
        ? posts
        : posts.filter((post) => post.category === selectedCategory)

    // new array copy before sorting to avoid mutating state
    const sortablePosts = [...filtered]

    if (selectedSort === 'Oldest') {
      sortablePosts.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
    } else {
      // Default to Newest
      sortablePosts.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    }

    return sortablePosts // Return the newly sorted array
  }, [posts, selectedCategory, selectedSort])

  // Pagination logic
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = processedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )
  const totalPages = Math.ceil(processedPosts.length / POSTS_PER_PAGE)

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Filter */}
        <BlogFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat: string) => {
            setSelectedCategory(cat)
            setCurrentPage(1) // Reset to page 1 on category change
          }}
          sortOptions={SORT_OPTIONS}
          selectedSort={selectedSort}
          onSortChange={(sort: string) => {
            setSelectedSort(sort)
            setCurrentPage(1) // Reset to page 1 on sort change
          }}
        />

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading posts...
          </p>
        ) : (
          <>
            <BlogList posts={currentPosts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}