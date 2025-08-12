// src/components/sections/EditorsPick/EditorsPickSection.tsx
import { useState, useEffect } from 'react';
import EditorsPickCard from './EditorsPickCard';
import EditorsSidebar from './EditorsSidebar';
import { getEditorsPickPosts } from '@my-sanity/queries';
import type { BlogPost } from 'src/data/types';
import { motion } from 'framer-motion';

export default function EditorsPickSection() {
  const [mainPosts, setMainPosts] = useState<BlogPost[]>([]);
  const [complementaryPosts, setComplementaryPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { main, complementary } = await getEditorsPickPosts();
        setMainPosts(main);
        setComplementaryPosts(complementary);
      } catch (err) {
        console.error("Failed to fetch Editor's Pick posts:", err);
        setError("Failed to load Editor's Pick posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8 lg:px-16">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading Editor's Pick posts...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8 lg:px-16">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  if (mainPosts.length === 0) {
    return null; // Don't render the section if there are no posts
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Editor&apos;s Pick
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EditorsPickCard post={post} />
              </motion.div>
            ))}
          </div>
          <div className="lg:w-1/3 space-y-8">
            <EditorsSidebar posts={complementaryPosts} />
          </div>
        </div>
      </div>
    </section>
  );
}