import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";

export default function PrivacyPage() {
  return (
    <PageShell
      brandHref="/"
      navigation={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/#projects" },
        { label: "Terms", href: "/terms" },
      ]}
    >
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <SectionShell
          id="privacy"
          eyebrow="Privacy"
          title="Privacy"
          tone="transparent"
          className="border-none bg-transparent px-0 py-0 shadow-none"
        >
          <div className="surface-panel px-6 py-10 sm:px-10 sm:py-14">
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Project Bridge approaches privacy with restraint, clarity, and
              respect. We prefer simple systems, clear boundaries, and only the
              information necessary to operate responsibly.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          id="privacy-principles"
          eyebrow="Principles"
          title="How privacy is approached"
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Data collection should stay minimal and intentional.
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Information should only be used to support the product and its
                users.
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Privacy decisions should stay aligned with trust and practical
                necessity.
              </p>
            </InfoCard>
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
