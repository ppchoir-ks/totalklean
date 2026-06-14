"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function MobileBand() {
  const t = useTranslations("mobile");
  const locale = useLocale();

  return (
    <section className="py-14 bg-baltic overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-aqua">
              Total Klean Mobile
            </span>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
              {t("headline")}
            </h2>
            <p className="font-body text-white/70 text-lg mb-8 leading-relaxed">
              {t("subtext")}
            </p>
            <Link
              href={`/${locale}/services#mobile`}
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-all duration-200 group"
            >
              {t("cta")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-72 lg:h-96 rounded-card overflow-hidden"
          >
            <Image
              src="/assets/services/mobile.jpg"
              alt="Total Klean Mobile — service à domicile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-baltic/40 to-transparent" />
            {/* Badge */}
            <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
              <p className="font-heading font-bold text-baltic text-sm">
                {locale === "fr" ? "Livré chez vous" : "We come to you"}
              </p>
              <p className="font-body text-obsidian/50 text-xs mt-0.5">
                {locale === "fr" ? "Goma & environs" : "Goma & surroundings"}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
