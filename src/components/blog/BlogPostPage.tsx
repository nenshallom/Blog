// src/components/sections/blog/BlogPostPage.tsx
import { useParams, Navigate } from "react-router-dom";
import type { BlogPost } from "../../data/types"; // Corrected import path for BlogPost type
import { allPosts } from "../../data/blog"; // <--- UPDATED PATH

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find the post matching the slug
  const post: BlogPost | undefined = allPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 min-h-screen mt-10">
      <article className="max-w-3xl mx-auto">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {post.category} • {post.date} • {post.readTime} {/* Added readTime here */}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.excerpt} {/* Replace this with full content later */}
        </p>
        {/* You can add more post details here, such as author, full content, etc. */}
        <div className="mt-8 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-bold mb-2">Author: {post.author}</h2>
          <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full object-cover float-left mr-4" />
          <p className="text-base">
            This is where the full, detailed content of the blog post would go.
            For now, we're just showing the excerpt. In a real application, you'd
            fetch the full HTML/Markdown content for this specific post.
          </p>
        </div>
      </article>
    </section>
  );
}