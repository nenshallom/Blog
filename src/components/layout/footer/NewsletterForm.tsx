import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);

  // Note: The form submission is handled by Netlify, so the
  // onSubmit logic here is for state management only.
  const handleSubmit = () => {
    // You can still perform client-side validation here if needed
    setIsLoading(true);
    setStatus("idle");
    // Netlify handles the actual POST request, so no fetch is needed
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* FIX: Add the 'data-netlify' attribute and the hidden input field.
        These are crucial for Netlify Forms to work.
      */}
      <form 
        name="newsletter" // This is the form name that will appear in Netlify dashboard
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="newsletter" />

        {/* Your form fields remain the same */}
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

        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">I am a:</p>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                name="role"
                id="role-business-owner"
                value="Business Owner"
                checked={role === "Business Owner"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-1"
                required
              />
              <label htmlFor="role-business-owner" className="text-sm text-gray-700 dark:text-gray-300">Business Owner</label>
            </div>
            <div>
              <input
                type="radio"
                name="role"
                id="role-ai-enthusiast"
                value="AI Enthusiast"
                checked={role === "AI Enthusiast"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-1"
              />
              <label htmlFor="role-ai-enthusiast" className="text-sm text-gray-700 dark:text-gray-300">AI Enthusiast</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      </form>

      {/* You can still display these messages, but you may need to update the logic */}
      {status === "success" && (
        <p className="text-green-600 text-sm mt-4">✅ Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-4">❌ There was an error. Please try again.</p>
      )}
    </div>
  );
}