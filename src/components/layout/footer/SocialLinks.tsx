import { socialLinks } from "../site.config";

export default function SocialLinks() {
  return (
    <div className="flex gap-4 mt-4 sm:mt-0">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a key={label} href={href} aria-label={label}>
          <Icon className="w-5 h-5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition" />
        </a>
      ))}
    </div>
  );
}
