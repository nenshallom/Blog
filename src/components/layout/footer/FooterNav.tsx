import { Link } from "react-router-dom";
import { MainLinks } from "../site.config";

export default function FooterNav() {
  return (
    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
      {MainLinks.map((link) => (
          <Link
          key={link.name}
          to={link.href}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition" >
          {link.name}
        </Link>
      ))}
    </ul>
  );
}
