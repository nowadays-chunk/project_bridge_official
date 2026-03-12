import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title?: string;
  description?: string;
  className?: string;
  tone?: "default" | "subtle" | "transparent";
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  className = "",
  tone = "default",
  children,
}: SectionShellProps) {
  const toneClass =
    tone === "subtle"
      ? "bg-surface-subtle/55"
      : tone === "transparent"
        ? "border-none bg-transparent shadow-none"
        : "";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`surface-panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 ${toneClass} ${className}`.trim()}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </p>
          {title ? (
            <h2
              id={`${id}-title`}
              className="text-balance text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl"
            >
              {title}
            </h2>
          ) : (
            <h2 id={`${id}-title`} className="sr-only">
              {eyebrow}
            </h2>
          )}
          {description ? (
            <p className="text-base leading-8 text-muted">{description}</p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}
