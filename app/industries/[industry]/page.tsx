import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";
import { getIndustryBySlug, industries } from "@/data/site-content";

type IndustryPageProps = {
  params: Promise<{
    industry: string;
  }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const item = getIndustryBySlug(industry);

  if (!item) {
    return {
      title: "Industry | Project Bridge",
    };
  }

  return {
    title: `${item.category} | Project Bridge`,
    description: item.overview,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry } = await params;
  const item = getIndustryBySlug(industry);

  if (!item) {
    notFound();
  }

  return (
    <PageShell
      brandHref="/"
      navigation={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/#projects" },
        { label: "Company", href: "/#company" },
      ]}
    >
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <SectionShell
          id="industry-hero"
          eyebrow="Industry"
          title={item.category}
          tone="transparent"
          className="border-none bg-transparent px-0 py-0 shadow-none"
        >
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <article className="surface-panel px-6 py-10 sm:px-10 sm:py-14">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 text-sm text-muted">
                  <Link href="/" className="hover:text-secondary">
                    Home
                  </Link>
                  <span>/</span>
                  <span>Industries</span>
                </div>
                <p className="max-w-3xl text-lg leading-8 text-muted">
                  {item.overview}
                </p>
              </div>
            </article>

            <div className="grid gap-4">
              <InfoCard className="min-h-36 rounded-[2rem] px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Projects
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  {item.projects.length}
                </p>
              </InfoCard>
              <InfoCard className="min-h-36 rounded-[2rem] px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Direction
                </p>
                <p className="mt-3 text-sm leading-7 text-secondary">
                  How we are shaping this industry through complete
                  applications.
                </p>
              </InfoCard>
            </div>
          </section>
        </SectionShell>

        <SectionShell
          id="industry-shaping"
          eyebrow="Shaping"
          title={`How Project Bridge is shaping ${item.category}`}
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {item.shaping.map((point) => (
              <InfoCard key={point} className="rounded-[2rem] px-6 py-6">
                <p className="text-base leading-8 text-secondary">{point}</p>
              </InfoCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="industry-projects"
          eyebrow="Projects"
          title={`Applications in ${item.category}`}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {item.projects.map((project) => (
              <article key={project.slug} className="surface-panel px-6 py-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                      Project
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {project.name}
                    </h2>
                  </div>

                  <p className="text-base leading-8 text-muted">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://${project.href}`}
                      className="inline-flex items-center rounded-full border border-line-soft bg-background px-3 py-2 text-sm text-secondary"
                    >
                      Visit project
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center rounded-full border border-line-soft bg-surface-subtle px-3 py-2 text-sm text-muted hover:bg-background hover:text-secondary"
                    >
                      Project page
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
