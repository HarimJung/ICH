"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Stat {
  value: string;
  label: string;
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="hero-gradient">
      <div
        ref={ref}
        className="container-content py-14 lg:py-16 fade-up"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[40px] lg:text-hero font-bold text-white leading-none">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/60 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
