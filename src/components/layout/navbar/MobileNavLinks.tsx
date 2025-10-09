// src/components/layout/Navbar/MobileNavLinks.tsx
import { Link } from "react-router-dom";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";
import BrandLogo from "./BrandLogo";
import SocialLinks from "../footer/SocialLinks";
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

      <nav className="pt-9 space-y-4">
        {MainLinks.map((link) => {
          // Destructure the icon from the link object
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              // Use flexbox to align icon and text
              className="flex items-center font-medium pb-5 border-b gap-7 text-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Icon className="w-6 h-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
        <DarkModeToggle />
        <div className="flex justify-center pt-16">
        <SocialLinks />
      </div>
      </nav>
  
    </motion.div>
  );
}
