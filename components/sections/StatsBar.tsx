"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";

type StatKey = "years" | "vehicles" | "services" | "satisfaction";

interface Stat {
  value: number;
  suffix: string;
  labelKey: StatKey;
}

const stats: Stat[] = [
  { value: 5,   suffix: "+", labelKey: "years" },
  { value: 500, suffix: "+", labelKey: "vehicles" },
  { value: 6,   suffix: "",  labelKey: "services" },
  { value: 98,  suffix: "%", labelKey: "satisfaction" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="font-heading font-bold text-4xl md:text-5xl text-baltic">
      {count}{suffix}
    </span>
  );
}

export function StatsBar() {
  const t = useTranslations("stats");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) setInView(true);
    };
    // Small delay so FM initial states are applied before we check
    const timer = setTimeout(check, 150);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", check);
    };
  }, [inView]);

  return (
    <section ref={ref} className="pt-10 pb-8 bg-white border-y border-black/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.labelKey}
              className="flex flex-col items-center text-center gap-2"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              <p className="font-body text-sm text-obsidian/50">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
        <LogoMarquee />
      </Container>
    </section>
  );
}
