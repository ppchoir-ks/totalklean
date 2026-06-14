"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  bg?: "baltic" | "obsidian" | "gradient";
}

export function PageHero({ eyebrow, heading, subtext, bg = "gradient" }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-12 overflow-hidden bg-obsidian">
      {/* Layered gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1520] via-obsidian to-[#0a1628]" />
        <div className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full bg-baltic/20 blur-[140px] -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-aqua/10 blur-[120px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-amber/6 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Glass divider line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-aqua mb-5"
            >
              {eyebrow}
            </motion.p>
          )}
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
            {heading}
          </h1>
          {subtext && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-body text-white/55 text-lg leading-relaxed max-w-xl"
            >
              {subtext}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
