import { ThemeToggle } from "@/components/theme-toggle";

const defaultNavigation = [
  { label: "Hero", href: "#hero" },
  { label: "Vision", href: "#vision" },
  { label: "Projects", href: "#projects" },
  { label: "Principles", href: "#principles" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Company", href: "#company" },
  { label: "Footer", href: "#footer" },
];

type SiteHeaderProps = {
  navigation?: { label: string; href: string }[];
  brandHref?: string;
};

export function SiteHeader({
  navigation = defaultNavigation,
  brandHref = "#hero",
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-4 pb-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[1.6rem] border border-line-soft bg-background/78 px-4 py-3 shadow-[0_18px_60px_rgba(18,18,17,0.08)] backdrop-blur-xl dark:bg-background/70 dark:shadow-[0_22px_80px_rgba(0,0,0,0.32)] sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <a href={brandHref} className="min-w-0">
            <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              Project Bridge
            </p>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-line-soft bg-surface-subtle/85 p-1 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-background hover:text-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>

        <nav
          aria-label="Primary mobile"
          className="mt-3 flex gap-2 overflow-x-auto border-t border-line-soft pt-3 lg:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-line-soft bg-surface-subtle px-3 py-2 text-sm text-muted transition-colors duration-200 hover:bg-background hover:text-secondary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
