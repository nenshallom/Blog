import { Link } from "react-router-dom";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";

export default function MobileNavLinks() {
  return (
    <div className="md:hidden px-4 pb-4 space-y-2">
            {MainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block hover:text-blue-600" >
                {link.name}
              </Link>
            ))}
      <DarkModeToggle />
    </div>
  );
}
