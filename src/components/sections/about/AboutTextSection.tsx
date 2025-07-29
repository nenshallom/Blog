// src/components/sections/about/AboutTextSection.tsx
export default function AboutTextSection() {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 max-w-3xl mx-auto">
      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
        <p className="text-justify">
          <strong>Code & Cultivate</strong> is a passion project built at the intersection of
          technology, creativity, and real-world growth. With roots in both frontend development and
          agriculture, this blog serves as a place to share not just technical knowledge, but also the
          lessons from building tools that make a real impact—especially for rural businesses and
          emerging markets.
        </p>

        <p>
          We believe in practical knowledge, clean code, and tools that truly solve problems. From
          AI-powered workflows to small business systems, everything we write is from hands-on
          experience and shared in a way that's actionable and clear.
        </p>

        <p>
          Whether you're a curious developer, a solo founder, or a farmer looking to automate, we’re
          here to explore, document, and build together.
        </p>
      </div>
    </section>
  );
}
