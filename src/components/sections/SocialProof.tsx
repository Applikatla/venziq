export default function SocialProof() {
  const badges = [
    "Enterprise Ready",
    "Built for Scale",
    "Security First",
    "Privacy Preserving",
    "Developer Friendly",
    "API First",
    "Compliance Focused",
    "Global Infrastructure"
  ];

  return (
    <section className="w-full py-16 px-6 border-y border-border bg-surface/50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-muted font-medium tracking-wide text-sm md:text-base">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
