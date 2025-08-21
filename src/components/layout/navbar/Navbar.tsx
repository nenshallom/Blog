import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";
import MobileNavLinks from "./MobileNavLinks";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center rounded-lg overflow-hidden font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow transition-colors duration-300">
              <span className="px-1 sm:pr-0 py-1 bg-[#184E59] dark:bg-green-500 text-white transition-colors duration-300">
                CodeAnd
              </span>
              <span className="pr-2  py-1 bg-green-500 dark:bg-[#184E59] text-white transition-colors duration-300">
                Cultivate
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {MainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-green-700 dark:hover:text-green-300  transition"
              >
                {link.name}
              </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50 "
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavLinks setMenuOpen={setMenuOpen} />
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
