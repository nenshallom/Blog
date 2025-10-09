// src/components/layout/Navbar/MobileNavLinks.tsx
import { Link } from "react-router-dom";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";
import BrandLogo from "./BrandLogo";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  setMenuOpen: (open: boolean) => void;
}

export default function MobileNavLinks({ setMenuOpen }: Props) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white dark:bg-gray-900 w-full h-full ml-auto px-6 py-8 shadow-lg z-50 space-y-6"
    >
      {/* Close Button */}
      <div className="flex justify-between">
      <BrandLogo />
      <button
        onClick={() => setMenuOpen(false)}
        className=" text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
      >
        <X className="w-6 h-6" />
      </button>
      </div>

      <nav className="mt-8 space-y-4">
        {MainLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <DarkModeToggle />
    </motion.div>
  );
}
