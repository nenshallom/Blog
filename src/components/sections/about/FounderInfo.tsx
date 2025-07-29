// src/components/sections/about/FounderInfoSection.tsx
import { Mail, Globe } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function FounderInfoSection() {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <img
          src="/images/founderAvatar.png" // Replace with your actual avatar image path
          alt="Founder"
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
        />

        {/* Name and Role */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Nendang Shallom Goshit
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Curious Catalyst · Developer · Farmer
        </p>

        {/* Contact Links */}
        <div className="flex gap-4 mt-2 text-blue-600 dark:text-blue-400">
          <a
            href="https://www.linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="mailto:yourname@gmail.com"
            className="hover:scale-110 transition"
          >
            <Mail size={20} />
          </a>

          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <Globe size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
