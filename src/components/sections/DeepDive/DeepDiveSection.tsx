// src/components/sections/DeepDive/DeepDiveSection.tsx
import { useState, useEffect } from "react";
import DeepDiveCard from "./DeepDiveCard";
import DeepDiveSidebar from "./DeepDiveSidebar";
import { getDeepDivePosts } from "@my-sanity/queries";
import type { BlogPost } from "src/data/types";

export default function DeepDiveSection() {
  const [featurePost, setFeaturePost] = useState<BlogPost | null>(null);
  const [sidePosts, setSidePosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { feature, sidePosts } = await getDeepDivePosts();
        if (feature) {
          setFeaturePost(feature);
        }
        setSidePosts(sidePosts);
      } catch (err) {
        console.error("Failed to fetch deep dive posts:", err);
        setError("Failed to load deep dive posts.");
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
          Loading deep dive posts...
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

  if (!featurePost) {
    return null;
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-medium">Deep Dive</h2>
          <span className="w-full align-middle border-2 rounded-xl border-opacity-30 border-10 border-green-500"></span>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <DeepDiveCard post={featurePost} />
          </div>
          <div className="lg:w-1/3 space-y-4">
            {/* FIX: Correctly map over sidePosts and pass a single 'post' prop */}
            {sidePosts.map((post) => (
              <DeepDiveSidebar key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}