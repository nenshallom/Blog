// src/components/sections/about/FounderInfoSection.tsx
import { Mail, Globe } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function FounderInfoSection() {
  return (
    <section className=" px-4 md:px-8 lg:px-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-sm  p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <img
          src="/images/Founder.jpeg" // Replace with your actual avatar image path
          alt="Founder"
          className="w-24 h-24 rounded-full object-cover object-top   mb-4 border-2 border-green-100"
        />

        {/* Name and Role */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Nendang Shallom Goshit
        </h3>
        <p className="text-sm">Founder</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Curious Catalyst · Software Developer · AI  
        </p>

        {/* Contact Links */}
        <div className="flex gap-4 mt-2 ">
          <a
            href="https://www.linkedin.com/in/nenshallom"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition text-blue-600 dark:text-white"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="mailto:sshallom92@gmail.com"
            className="hover:scale-110 transition"
          >
            <Mail size={20} />
          </a>

          <a
            href="https://nenshallom.netlify.app"
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
