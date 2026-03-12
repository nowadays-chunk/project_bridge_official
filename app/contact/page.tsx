import { InfoCard } from "@/components/info-card";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";

export default function ContactPage() {
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
          id="contact"
          eyebrow="Contact"
          title="Contact"
          tone="transparent"
          className="border-none bg-transparent px-0 py-0 shadow-none"
        >
          <div className="surface-panel px-6 py-10 sm:px-10 sm:py-14">
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Project Bridge is shaped through Software Development &amp;
              Engineering, Coding Unleashed LLC, and the direction of Hamza
              El Jaouhari.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          id="contact-entities"
          eyebrow="Company"
          title="Who is behind Project Bridge"
          tone="subtle"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Software Development &amp; Engineering
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Coding Unleashed LLC
              </p>
            </InfoCard>
            <InfoCard className="rounded-[2rem] px-6 py-6">
              <p className="text-base leading-8 text-secondary">
                Hamza El Jaouhari
              </p>
            </InfoCard>
          </div>
        </SectionShell>
      </main>
    </PageShell>
  );
}
