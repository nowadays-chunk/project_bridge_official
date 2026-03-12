import type { ReactNode } from "react";
import { OrnamentOrb } from "@/components/ornament-orb";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
  navigation?: { label: string; href: string }[];
  brandHref?: string;
};

export function PageShell({
  children,
  navigation,
  brandHref,
}: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(160,149,132,0.18),transparent_62%)] dark:bg-[radial-gradient(circle_at_top,rgba(196,184,164,0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <OrnamentOrb className="right-[-3rem] top-20 -z-10 h-52 w-52" />
      <OrnamentOrb className="bottom-40 left-[-4rem] -z-10 h-64 w-64" />

      <SiteHeader navigation={navigation} brandHref={brandHref} />

      {children}

      <SiteFooter />
    </div>
  );
}
