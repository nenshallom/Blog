// src/components/layout/Navbar/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { navLinks } from "./navConfig";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";
import MobileNavLinks from "./MobileNavLinks";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);


  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black shadow dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* This div already applies the fixed width */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/mainLogo.png" // 🖼️ <-- Replace with your actual logo path
              alt="Code & Cultivate Logo"
              className="h-32 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {MainLinks.map(link => (
          <Link
            key={link.name}
            to={link.href}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition" >
            {link.name}
          </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && <MobileNavLinks />}
    </nav>
  );
}