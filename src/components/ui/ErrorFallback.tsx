// src/components/ui/ErrorFallback.tsx
import type { FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-900 text-center">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {error.message}
        </p>
        <div className="flex gap-4 justify-center">
            <button
            onClick={resetErrorBoundary}
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition"
            >
            Try again
            </button>
            <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded transition"
            >
            Go Home
            </Link>
        </div>
      </div>
    </section>
  );
}