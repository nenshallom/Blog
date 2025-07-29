import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
}
