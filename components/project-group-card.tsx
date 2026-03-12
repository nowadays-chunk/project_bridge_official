import Link from "next/link";
import type { IndustryItem } from "@/data/site-content";

export function ProjectGroupCard({ group }: { group: IndustryItem }) {
  return (
    <article className="surface-panel px-6 py-6 sm:px-7">
      <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(156,135,111,0.16),transparent_70%)] opacity-70 dark:bg-[radial-gradient(circle,rgba(196,184,164,0.1),transparent_70%)]" />

      <div className="flex items-start justify-between gap-4 border-b border-line-soft pb-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            Industry
          </p>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-[-0.045em] text-foreground">
              {group.category}
            </h3>
            <p className="text-sm leading-7 text-muted">
              {group.projects.length} project
              {group.projects.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href={`/industries/${group.slug}`}
            className="inline-flex items-center rounded-full border border-line-soft bg-surface-subtle px-3 py-2 text-sm text-secondary transition-colors duration-300 hover:bg-background"
          >
            Industry page
          </Link>
        </div>

        <div className="flex h-11 min-w-11 items-center justify-center rounded-full border border-line-soft bg-surface-subtle px-3 text-xs font-semibold tracking-[0.18em] text-muted">
          {String(group.projects.length).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {group.projects.map((project, index) => (
          <article
            key={project.name}
            className="rounded-[1.5rem] border border-line-soft bg-surface-subtle/90 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-background/86 hover:shadow-[0_14px_30px_rgba(18,18,17,0.06)] dark:hover:shadow-[0_18px_36px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-line-soft bg-background/70 text-xs font-semibold tracking-[0.18em] text-muted dark:bg-background/40">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <a
                    href={`https://${project.href}`}
                    aria-label={`Open ${project.name}`}
                    title={project.href}
                    className="block"
                  >
                    <p className="text-base font-medium text-secondary">
                      {project.name}
                    </p>
                    <p className="truncate text-sm leading-7 text-muted">
                      {project.href}
                    </p>
                  </a>
                </div>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-line-soft bg-background/70 text-xs font-semibold tracking-[0.18em] text-muted dark:bg-background/40">
                ↗
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`https://${project.href}`}
                className="inline-flex items-center rounded-full border border-line-soft bg-background px-3 py-2 text-sm text-secondary transition-colors duration-300 hover:border-line-strong"
              >
                Visit project
              </a>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center rounded-full border border-line-soft bg-surface-subtle px-3 py-2 text-sm text-muted transition-colors duration-300 hover:bg-background hover:text-secondary"
              >
                Project page
              </Link>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
