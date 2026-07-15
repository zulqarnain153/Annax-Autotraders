import { StatCounter } from "@/components/ui/StatCounter";
import { business } from "@/lib/business";

export function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-navy-950 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {business.stats.map((stat) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            decimals={stat.label.includes("Rating") ? 1 : 0}
          />
        ))}
      </div>
    </section>
  );
}
