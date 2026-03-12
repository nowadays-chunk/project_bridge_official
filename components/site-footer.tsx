import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="mx-auto mt-2 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="surface-panel px-6 py-8 sm:px-8">
        <div className="grid gap-6 border-t border-line-soft pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-secondary">
              Project Bridge
            </p>
            <p className="max-w-lg text-sm leading-7 text-muted">
              2026 / 2035 — Making The Applications Work Efficiently
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-2 lg:justify-end"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-line-soft bg-surface-subtle px-3 py-2 text-sm text-muted transition-colors duration-300 hover:bg-background hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-line-soft pt-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Copyright 2026 Project Bridge
          </p>
        </div>
      </div>
    </footer>
  );
}
