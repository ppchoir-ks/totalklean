"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  dark?: boolean;
}

export function GlassCard({ children, className, delay = 0, hover = true, dark = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(
        "rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        dark
          ? "bg-white/6 backdrop-blur-xl border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_4px_28px_rgba(40,88,137,0.08),0_1px_6px_rgba(0,0,0,0.04)]",
        hover && !dark && "hover:shadow-[0_24px_56px_rgba(40,88,137,0.16),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-2",
        hover && dark && "hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)] hover:-translate-y-2",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Decorative background blobs for sections
export function SectionBlobs({ variant = "default" }: { variant?: "default" | "warm" | "cool" }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {variant === "default" && (
        <>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-baltic/5 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-aqua/4 blur-[100px]" />
        </>
      )}
      {variant === "warm" && (
        <>
          <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-[100px]" />
          <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-baltic/5 blur-[90px]" />
        </>
      )}
      {variant === "cool" && (
        <>
          <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-aqua/5 blur-[110px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-baltic/6 blur-[100px]" />
        </>
      )}
    </div>
  );
}
