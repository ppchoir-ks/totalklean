"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.jpg"
          alt="Voiture en cours de préparation esthétique professionnelle"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/60 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-bold text-white leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8"
          >
            {t("headline")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/cotation`}
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-all duration-200 group"
            >
              {t("cta")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/50 text-white font-body font-semibold rounded-btn hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* Floating stat chips */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden lg:flex flex-col gap-4 absolute right-8 xl:right-0 bottom-24"
        >
          {[
            { value: "5+", label: locale === "fr" ? "Ans d'expérience" : "Years experience" },
            { value: "500+", label: locale === "fr" ? "Véhicules traités" : "Vehicles detailed" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-card px-5 py-4 text-white"
            >
              <p className="font-heading font-bold text-2xl text-amber">{stat.value}</p>
              <p className="font-body text-xs text-white/70 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
