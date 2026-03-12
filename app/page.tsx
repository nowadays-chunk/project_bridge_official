import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { ProjectGroupCard } from "@/components/project-group-card";
import { SectionShell } from "@/components/section-shell";
import {
  companyItems,
  heroContent,
  philosophyContent,
  principleGroups,
  projectGroups,
  visionStatements,
} from "@/data/site-content";

export default function Home() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <SectionShell
          id="hero"
          eyebrow="Hero"
          tone="transparent"
          className="overflow-hidden border-none bg-transparent px-0 py-0 shadow-none"
        >
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <div className="surface-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
              <div className="pointer-events-none absolute inset-y-8 left-8 w-px bg-gradient-to-b from-transparent via-line-soft to-transparent" />
              <div className="space-y-6">
                <div className="space-y-5">
                  <span className="inline-flex items-center rounded-full border border-line-strong bg-surface-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                    {heroContent.kicker}
                  </span>

                  <div className="space-y-4">
                    <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl lg:leading-[1.02]">
                      {heroContent.title}
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                      {heroContent.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="grid gap-4">
              {heroContent.highlights.map((item) => (
                <div
                  key={item}
                  className="surface-panel flex min-h-36 items-end px-6 py-6 sm:px-7"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </aside>
          </section>
        </SectionShell>

        <SectionShell
          id="vision"
          eyebrow="Vision"
          title="Vision"
          tone="subtle"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {visionStatements.map((statement) => (
              <InfoCard key={statement} className="rounded-[2rem] px-6 py-6">
                <p className="text-lg leading-8 text-secondary">{statement}</p>
              </InfoCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="projects"
          eyebrow="Projects"
          title="Projects"
        >
          <div className="grid gap-4 xl:grid-cols-2">
            {projectGroups.map((group) => (
              <ProjectGroupCard key={group.category} group={group} />
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="principles"
          eyebrow="Principles"
          title="Principles"
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {principleGroups.map((group) => (
              <article
                key={group.title}
                className="surface-panel px-6 py-6 sm:px-7"
              >
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-line-soft bg-surface-subtle px-4 py-4 text-base leading-7 text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="philosophy"
          eyebrow="Philosophy"
          title="Philosophy"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <article className="surface-panel flex items-center px-6 py-8 sm:px-8">
              <p className="max-w-lg text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                {philosophyContent.opening}
              </p>
            </article>

            <article className="surface-panel px-6 py-6 sm:px-8">
              <ul className="space-y-3">
                {philosophyContent.rules.map((rule) => (
                  <li
                    key={rule}
                    className="rounded-2xl border border-line-soft bg-surface-subtle px-4 py-4 text-base leading-7 text-secondary"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </SectionShell>

        <SectionShell
          id="company"
          eyebrow="Company"
          title="Company"
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {companyItems.map((item) => (
              <article
                key={item}
                className="surface-panel flex min-h-40 items-end px-6 py-6"
              >
                <p className="text-lg leading-8 text-secondary">{item}</p>
              </article>
            ))}
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
