// Footer.tsx
import { Link } from "react-router-dom";
import FooterNav from "./FooterNav";
import FooterTags from "./FooterTags";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Column 1: Branding */}
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/Logo-main.png" // 🖼️ <-- Replace with your actual logo path
              alt="Code & Cultivate Logo"
className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain"
            />
          </Link>
          <p className="text-sm mt-2">Real Tools. Real Growth.</p>
        </div>

        {/* Column 2: Navigation and Newsletter */}
        <div className="flex flex-col gap-4">
          <FooterNav />
          <NewsletterForm />
        </div>

        {/* Column 3: Tags and Socials */}
        <div className="flex flex-col gap-4">
          <FooterTags />
          <SocialLinks />
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} GGN. All rights reserved.
      </div>
    </footer>
  );
}
