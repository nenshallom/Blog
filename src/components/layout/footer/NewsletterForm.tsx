// src/components/layout/footer/NewsletterForm.tsx
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // The 'role' and 'status' state variables have been removed as they were unused.
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (_event: React.FormEvent<HTMLFormElement>) => {
    // This is a standard Netlify form submission.
    // We don't need to prevent the default behavior or handle state manually
    // as Netlify's bots will process the form submission automatically.
    // We can, however, manage the loading state for a better UX.
    setIsLoading(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        name="newsletter"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        {/* Form fields */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white w-full"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white w-full"
          required
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition w-full disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      </form>

      {/* For Netlify forms, you typically redirect to a "thank you" page on success.
        Displaying a success/error message here requires more advanced JavaScript-based submission.
        For now, removing the unused 'status' state is the correct fix.
      */}
    </div>
  );
}