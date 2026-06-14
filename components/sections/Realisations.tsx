"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    num: "01",
    key: "step1" as const,
    image: "/assets/services/lavage.jpg",
    alt: "Intérieur de véhicule nettoyé",
  },
  {
    num: "02",
    key: "step2" as const,
    image: "/assets/services/ceramic.jpg",
    alt: "Protection céramique appliquée",
  },
  {
    num: "03",
    key: "step3" as const,
    image: "/assets/services/phares.jpg",
    alt: "Phares rénovés",
  },
  {
    num: "04",
    key: "step4" as const,
    image: "/assets/services/moteur.jpg",
    alt: "Moteur nettoyé",
  },
  {
    num: "05",
    key: "step5" as const,
    subKey: "step5sub" as const,
    image: "/assets/services/mobile.jpg",
    alt: "Total Klean Mobile",
    featured: true,
  },
];

export function Realisations() {
  const t = useTranslations("realizations");
  const locale = useLocale();

  return (
    <section className="py-14 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: heading + numbered steps */}
          <div>
            <SectionHeading
              eyebrow="Total Klean"
              heading={t("heading")}
              subtext={t("subtext")}
              align="left"
              className="mb-8"
            />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-5 items-start group"
                >
                  <span className="font-heading font-bold text-4xl text-baltic/15 leading-none w-14 flex-shrink-0 group-hover:text-baltic/30 transition-colors">
                    {step.num}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-heading font-semibold text-obsidian text-lg">
                      {t(step.key)}
                    </h3>
                    {step.subKey && (
                      <p className="font-body text-sm text-obsidian/55 mt-1 leading-relaxed">
                        {t(step.subKey)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href={`/${locale}/cotation`}
                className="inline-flex items-center gap-2 px-7 py-4 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors duration-200"
              >
                {t("badge")}
              </Link>
            </motion.div>
          </div>

          {/* Right: image mosaic */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute -top-5 -right-5 z-10 bg-amber text-white rounded-2xl px-5 py-3 shadow-lg"
            >
              <p className="font-heading font-bold text-2xl">98%</p>
              <p className="font-body text-xs text-white/80">
                {locale === "fr" ? "Clients satisfaits" : "Happy clients"}
              </p>
            </motion.div>

            {[steps[0], steps[1], steps[2], steps[3]].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={`relative rounded-card overflow-hidden ${i === 0 || i === 3 ? "h-56" : "h-44"}`}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
