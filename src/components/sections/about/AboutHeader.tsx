// src/components/sections/about/AboutHeader.tsx
export default function AboutHeader() {
  return (
    <div className="text-center py-10 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-700 dark:text-white mb-4">
        About <span className="text-green-600">Code & Cultivate</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Real Tools. Real Growth. Learn how our journey began and why we’re building with purpose.
      </p>
    </div>
  );
}
