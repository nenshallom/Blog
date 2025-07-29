import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background moves slower (delayed parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-[70vh] overflow-hidden"
    >
      {/* Background image and overlay now move together */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="AI helping businesses"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl sm:text-5xl font-bold mb-4 leading-tight"
        >
          Welcome to <span className="text-blue-400">GGN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-base sm:text-lg mb-6 max-w-xl text-gray-200"
        >
          This AI-powered blog explores how technology simplifies our dev journeys,
          business challenges, and complex ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <a
            href="blog"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 "
          >
            Explore Blog
          </a>
          <a
            href="newsletter"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded transition duration-300 transform hover:scale-105"
          >
            Join Newsletter
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
