// src/components/layout/Navbar/MobileNavLinks.tsx
// import { navLinks } from "./navConfig";
import { MainLinks } from "../site.config";
import DarkModeToggle from "./DarkModeToggle";

export default function MobileNavLinks() {
  return (
    <div className="md:hidden px-4 pb-4 space-y-2">
      {MainLinks.map(link => (
        <a key={link.name} href={link.href} className="block hover:underline">
          {link.name}
        </a>
      ))}
      <DarkModeToggle />
    </div>
  );
}
