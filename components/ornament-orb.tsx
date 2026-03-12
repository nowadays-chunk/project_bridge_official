type OrnamentOrbProps = {
  className?: string;
};

export function OrnamentOrb({ className = "" }: OrnamentOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(156,135,111,0.18),rgba(156,135,111,0.04)_48%,transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(196,184,164,0.12),rgba(196,184,164,0.02)_45%,transparent_72%)] ${className}`.trim()}
    />
  );
}
