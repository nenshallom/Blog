import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import BrandLogo from "@components/layout/navbar/BrandLogo";
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
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow dark:bg-gray-900 dark:text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <BrandLogo />

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
