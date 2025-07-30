// src/components/sections/home/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-center mt-16">
      {/* Big Bold Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight uppercase"
      >
       <span className="text-green-500">Real Tools</span> and Tech
        <br />
        Bringing <span className="text-green-500">Real Growth</span> to your 
        <br />
        <span className="text-[#184E59]">Hustle</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400"
      >
        Real tools. Real stories. Explore AI, dev journeys, and small business ideas that grow with you.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 flex flex-wrap gap-4 justify-center"
      >
        <Link
          to="/blog"
          className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Explore Blog
        </Link>
        <Link
          to="/newsletter"
          className="px-6 py-3 rounded-full border border-green-500 text-green-600 font-semibold hover:bg-green-100 dark:hover:bg-gray-800 transition"
        >
          Join Newsletter
        </Link>
      </motion.div>
    </section>
  );
}
