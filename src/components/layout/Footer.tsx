import { person, social } from "@/config";
import { iconLibrary } from "@/config/icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {currentYear} {person.name}
        </p>
        <div className="flex items-center gap-6">
          {social.map((item) => {
            const IconComponent = iconLibrary[item.icon];
            return item.link && IconComponent ? (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff4081] dark:hover:text-[#ff4081] transition-colors"
                aria-label={item.name}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            ) : null;
          })}
        </div>
      </div>
      {/* Mobile spacer for bottom nav */}
      <div className="h-20 md:hidden" />
    </footer>
  );
};
