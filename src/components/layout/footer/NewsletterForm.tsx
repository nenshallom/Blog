// src/components/shared/NewsletterForm.tsx
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setStatus("error");
      return;
    }

    // Simulate async success (replace with real API later)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 500);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
        >
          Subscribe
        </button>
      </form>

      {/* Feedback message */}
      {status === "success" && (
        <p className="text-green-600 text-sm mt-2">✅ Subscribed successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">❌ Please enter a valid email address.</p>
      )}
    </div>
  );
}
