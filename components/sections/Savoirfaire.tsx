"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = {
  fr: [
    "Produits professionnels de haute qualité",
    "Techniciens formés et certifiés",
    "Résultats garantis à chaque intervention",
    "Service personnalisé selon votre véhicule",
  ],
  en: [
    "Professional, high-quality products",
    "Trained and certified technicians",
    "Guaranteed results on every visit",
    "Service personalised to your vehicle",
  ],
};

export function Savoirfaire() {
  const t = useTranslations("savoirfaire");
  const locale = useLocale() as "fr" | "en";

  return (
    <section className="py-24 bg-obsidian overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-80 lg:h-[480px] rounded-card overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1611189870994-5b3ac77a0fb3?w=800&q=80"
                alt="Polissage professionnel — Total Klean"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </div>

            {/* Service label chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-amber text-white rounded-2xl px-6 py-4 shadow-xl"
            >
              <p className="font-body text-xs text-white/70 uppercase tracking-wider">
                {locale === "fr" ? "Service en vedette" : "Featured service"}
              </p>
              <p className="font-heading font-bold text-2xl mt-1">{t("service")}</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pl-8"
          >
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-aqua">
              {locale === "fr" ? "Notre expertise" : "Our expertise"}
            </span>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
              {t("heading")}
            </h2>

            <ul className="space-y-4 mb-10">
              {features[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-aqua mt-0.5 flex-shrink-0" />
                  <span className="font-body text-white/70">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-all duration-200 group"
            >
              {locale === "fr" ? "Découvrir nos services" : "Explore our services"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
