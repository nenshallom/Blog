import { socialLinks } from "../site.config";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 mt-4 sm:mt-0">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a key={label} href={href} aria-label={label}>
          <Icon className="w-7 h-7 text-gray-500 hover:text-[#184E59] dark:text-gray-400 dark:hover:text-[#184E59] transition" />
        </a>
      ))}
    </div>
  );
}
