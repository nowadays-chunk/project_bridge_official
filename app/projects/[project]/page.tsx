import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";
import { getProjectBySlug, allProjects } from "@/data/site-content";

type ProjectPageProps = {
  params: Promise<{
    project: string;
  }>;
};

export function generateStaticParams() {
  return allProjects.map((project) => ({
    project: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { project } = await params;
  const item = getProjectBySlug(project);

  if (!item) {
    return {
      title: "Project | Project Bridge",
    };
  }

  return {
    title: `${item.name} | Project Bridge`,
    description: item.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project } = await params;
  const item = getProjectBySlug(project);

  if (!item) {
    notFound();
  }

  return (
    <PageShell
      brandHref="/"
      navigation={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/#projects" },
        { label: item.industryCategory, href: `/industries/${item.industrySlug}` },
      ]}
    >
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <SectionShell
          id="project-hero"
          eyebrow="Project"
          title={item.name}
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
                  <Link
                    href={`/industries/${item.industrySlug}`}
                    className="hover:text-secondary"
                  >
                    {item.industryCategory}
                  </Link>
                </div>

                <p className="max-w-3xl text-lg leading-8 text-muted">
                  {item.summary}
                </p>
              </div>
            </article>

            <div className="grid gap-4">
              <InfoCard className="rounded-[2rem] px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Industry
                </p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {item.industryCategory}
                </p>
              </InfoCard>
              <InfoCard className="rounded-[2rem] px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Live project
                </p>
                <a
                  href={`https://${item.href}`}
                  className="mt-3 block text-sm leading-7 text-secondary underline-offset-4 hover:underline"
                >
                  {item.href}
                </a>
              </InfoCard>
            </div>
          </section>
        </SectionShell>

        <SectionShell
          id="project-shaping"
          eyebrow="Shaping"
          title={`How we are shaping ${item.name}`}
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
          id="project-place"
          eyebrow="Context"
          title="Place in Project Bridge"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                {item.name} belongs to {item.industryCategory} and contributes to
                the wider Project Bridge direction of making applications work
                efficiently.
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Everything is a knowledge base system with different
                processings.
              </p>
            </InfoCard>
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
