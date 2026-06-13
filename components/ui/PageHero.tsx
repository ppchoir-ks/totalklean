"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  bg?: "baltic" | "obsidian" | "gradient";
}

const bgClasses = {
  baltic: "bg-baltic",
  obsidian: "bg-obsidian",
  gradient: "bg-gradient-to-br from-obsidian via-baltic to-obsidian",
};

export function PageHero({ eyebrow, heading, subtext, bg = "gradient" }: PageHeroProps) {
  return (
    <section className={`${bgClasses[bg]} pt-36 pb-20 overflow-hidden relative`}>
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,#47A4C3,transparent_60%),radial-gradient(circle_at_80%_20%,#EF762F,transparent_50%)]" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-aqua mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
            {heading}
          </h1>
          {subtext && (
            <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl">
              {subtext}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
