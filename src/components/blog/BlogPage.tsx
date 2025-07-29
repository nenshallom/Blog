// src/components/sections/blog/BlogPage.tsx
import { useState } from "react";
import BlogFilterBar from "./BlogFilterBar";
import BlogList from "./BlogList";
import Pagination from "./Pagination";
import { allPosts } from "../../data/blog"; 



const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredPosts = selectedCategory === "All"
    ? allPosts
    : allPosts.filter((post) => post.category === selectedCategory);

  // Pagination logic
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 min-h-screen mt-10">
      {/* Filter */}
      <BlogFilterBar
        categories={["All", "Development", "UI/UX", "AI"]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Blog List */}
      <BlogList posts={currentPosts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
