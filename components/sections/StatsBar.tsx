"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

type StatKey = "years" | "vehicles" | "services" | "satisfaction";

interface Stat {
  value: number;
  suffix: string;
  labelKey: StatKey;
}

const stats: Stat[] = [
  { value: 5, suffix: "+", labelKey: "years" },
  { value: 500, suffix: "+", labelKey: "vehicles" },
  { value: 6, suffix: "", labelKey: "services" },
  { value: 98, suffix: "%", labelKey: "satisfaction" },
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
      {count}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const t = useTranslations("stats");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-white border-y border-black/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              <p className="font-body text-sm text-obsidian/50">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
