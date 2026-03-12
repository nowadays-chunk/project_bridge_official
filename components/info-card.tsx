import type { ReactNode } from "react";

type InfoCardProps = {
  children: ReactNode;
  className?: string;
};

export function InfoCard({ children, className = "" }: InfoCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border border-line-soft bg-surface-subtle px-5 py-4 shadow-[0_12px_30px_rgba(18,18,17,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.22)] ${className}`.trim()}
    >
      {children}
    </article>
  );
}
