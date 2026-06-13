"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col gap-3", alignClass, className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-body text-xs font-semibold uppercase tracking-widest",
            light ? "text-aqua" : "text-aqua"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-bold leading-tight",
          "text-3xl sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-obsidian"
        )}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={cn(
            "font-body text-base sm:text-lg max-w-2xl leading-relaxed",
            light ? "text-white/75" : "text-obsidian/60"
          )}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
