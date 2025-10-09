// src/components/layout/Navbar/DarkModeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { toggleDarkMode } from "../../../utils/theme";

export default function DarkModeToggle() {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
    >
      <Moon className="w-6 h-6 hidden dark:block" />
      <Sun className="w-6 h-6 dark:hidden" />
      <span className="text-md font-semibold">Theme</span>
    </button>
  );
}
