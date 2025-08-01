// src/components/sections/home/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 1024); // Tailwind's lg breakpoint
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-center mt-16 overflow-hidden">
      {/* Background SVG Image – responsive and animated */}
      <motion.img
        initial={{ 
          x: isLargeScreen ? 100 : 0, 
          y: isLargeScreen ? 0 : -80, 
          opacity: 0 
        }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        src="/images/hero-bg.png"
        alt="AI vector"
        className={`
          w-[60%] sm:w-[50%] md:w-[40%] h-auto mx-auto mb-8
          lg:absolute lg:bottom-10 lg:w-[17vw] lg:mb-20 lg:right-9
          max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
          object-contain pointer-events-none opacity-80 z-0
        `}
      />

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight uppercase z-10"
      >
        <span className="text-green-500">Real Tools</span> and Tech
        <br />
        Bringing <span className="text-green-500">Real Growth</span> to your
        <span className="text-[#184E59]"> Hustle</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 text-left text-base sm:text-lg text-gray-600 dark:text-gray-400 z-10"
      >
        Explore Tools, Solutions and Ideas to Grow and Scale your Business.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex flex-wrap gap-4 justify-center z-10"
      >
        <Link
          to="/blog"
          aria-label="Explore the blog"
          className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Explore Blog
        </Link>

        <Link
          to="/newsletter"
          aria-label="Subscribe to the newsletter"
          className="px-6 py-3 rounded-full border border-green-500 text-green-600 font-semibold hover:bg-green-100 dark:hover:bg-gray-800 transition"
        >
          Join Newsletter
        </Link>
      </motion.div>
    </section>
  );
}
