// src/pages/NewsletterPage.tsx
import { motion } from "framer-motion";
import NewsletterForm from "../layout/footer/NewsletterForm";
import { socialLinks } from "../layout/site.config"; 
import { Link } from "react-router-dom";

export default function NewsletterPage() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 flex flex-col ">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Let’s Grow Together!
        </motion.h1>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            📨 Stay ahead of the loop
          </p>
          <p className="text-md mt-2 text-gray-500 dark:text-gray-400">
            Get the latest articles and insights weekly to grow yourself and your business.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8"
        >
          <NewsletterForm />
        </motion.div>
      </div>

      {/* Footer Message + Icons */}
      <div className="mt-20 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          We discuss and share ideas and tools that build your business.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                to={item.href}
                key={item.label}
                aria-label={item.label}
                className="text-gray-500 dark:text-gray-400 hover:text-[#184E59] dark:hover:text-[#184E59] transition"
              >
                <Icon size={24} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
