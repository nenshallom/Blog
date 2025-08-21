// Footer.tsx
import { Link } from "react-router-dom";
import FooterNav from "./FooterNav";
import FooterTags from "./FooterTags";
import SocialLinks from "./SocialLinks";
// import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Column 1: Branding */}
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center rounded-md overflow-hidden font-bold text-xs sm:text-sm md:text-base shadow transition-colors duration-300">
              <span className="px-1 sm:pl-2 py-0.5 bg-[#184E59] dark:bg-green-500 text-white transition-colors duration-300">
                CodeAnd
              </span>
              <span className="pr-2 sm:px-2 py-0.5 bg-green-500 dark:bg-[#184E59] text-white transition-colors duration-300">
                Cultivate
              </span>
            </div>
          </Link>

          <p className="text-sm mt-2">Real Tools. Real Growth.</p>
        </div>

        {/* Column 2: Navigation and Newsletter */}
        <div className="flex flex-col gap-4">
          <FooterNav />
          {/* <NewsletterForm /> */}
        </div>

        {/* Column 3: Tags and Socials */}
        <div className="flex flex-col gap-4">
          <FooterTags />
          <SocialLinks />
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Code&Cultivate. All rights reserved.
      </div>
    </footer>
  );
}
