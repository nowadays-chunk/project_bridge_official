import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";

export default function TermsPage() {
  return (
    <PageShell
      brandHref="/"
      navigation={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/#projects" },
        { label: "Privacy", href: "/privacy" },
      ]}
    >
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <SectionShell
          id="terms"
          eyebrow="Terms"
          title="Terms"
          tone="transparent"
          className="border-none bg-transparent px-0 py-0 shadow-none"
        >
          <div className="surface-panel px-6 py-10 sm:px-10 sm:py-14">
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Project Bridge aims for clarity, fair use, and practical
              responsibility. Use of the applications and pages should remain
              aligned with the intended direction of useful, complete systems.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          id="terms-principles"
          eyebrow="Agreement"
          title="Working terms"
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                The work should be used in ways that respect users and product
                intent.
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Access and usage should not create unnecessary harm or misuse.
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Terms should support clarity, not create avoidable friction.
              </p>
            </InfoCard>
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
