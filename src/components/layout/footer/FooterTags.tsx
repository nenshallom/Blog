// FooterTags.tsx
import { footerTags } from "../site.config";

export default function FooterTags() {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
      {footerTags.map((tag) => (
        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          {tag}
        </span>
      ))}
    </div>
  );
}
