"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    id: "lavage",
    anchor: "#lavage",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80",
    frLabel: "Lavage basique et complet",
    enLabel: "Basic & Full Wash",
    frDesc: "Nettoyage intérieur et extérieur minutieux, de la carrosserie aux moindres détails.",
    enDesc: "Thorough interior and exterior cleaning, from bodywork to the finest details.",
  },
  {
    id: "peinture",
    anchor: "#correction-peinture",
    image: "https://images.unsplash.com/photo-1611189870994-5b3ac77a0fb3?w=600&q=80",
    frLabel: "Correction de la peinture",
    enLabel: "Paint Correction",
    frDesc: "Élimination des rayures et oxydation pour retrouver une carrosserie impeccable.",
    enDesc: "Removal of scratches and oxidation to restore a flawless body finish.",
  },
  {
    id: "ceramique",
    anchor: "#ceramique",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    frLabel: "Protection céramique",
    enLabel: "Ceramic Protection",
    frDesc: "Revêtement hydrophobe longue durée qui protège et sublime votre véhicule.",
    enDesc: "Long-lasting hydrophobic coating that protects and enhances your vehicle.",
  },
  {
    id: "phares",
    anchor: "#phares",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80",
    frLabel: "Rénovation des phares",
    enLabel: "Headlight Restoration",
    frDesc: "Restauration de la clarté et de l'éclat de vos optiques ternis ou jaunis.",
    enDesc: "Restoring clarity and brilliance to your clouded or yellowed headlights.",
  },
  {
    id: "moteur",
    anchor: "#moteur",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
    frLabel: "Nettoyage moteur",
    enLabel: "Engine Cleaning",
    frDesc: "Dégraissage en profondeur du compartiment moteur pour un entretien optimal.",
    enDesc: "Deep degreasing of the engine compartment for optimal maintenance.",
  },
  {
    id: "mobile",
    anchor: "#mobile",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    frLabel: "Total Klean Mobile",
    enLabel: "Total Klean Mobile",
    frDesc: "Tous nos services livrés directement à votre porte — chez vous, au bureau.",
    enDesc: "All our services delivered directly to your door — home or office.",
    featured: true,
  },
];

export function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-24 bg-[#f8f9fc]">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Total Klean"
            heading={t("heading")}
            subtext={t("intro")}
            align="left"
            className="max-w-xl"
          />
          <Link
            href={`/${locale}/services`}
            className="flex-shrink-0 inline-flex items-center gap-2 font-body text-sm font-semibold text-baltic hover:text-amber transition-colors"
          >
            {t("cta")}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/${locale}/services${svc.anchor}`}
                className="group block bg-white rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={locale === "fr" ? svc.frLabel : svc.enLabel}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {svc.featured && (
                    <span className="absolute top-3 left-3 bg-amber text-white font-body text-xs font-semibold px-3 py-1 rounded-full">
                      Mobile
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-obsidian text-lg mb-2 group-hover:text-baltic transition-colors">
                    {locale === "fr" ? svc.frLabel : svc.enLabel}
                  </h3>
                  <p className="font-body text-sm text-obsidian/55 leading-relaxed">
                    {locale === "fr" ? svc.frDesc : svc.enDesc}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 font-body text-xs font-semibold text-baltic group-hover:text-amber transition-colors">
                    {t("cta")} <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center font-body text-sm text-obsidian/40 mt-10"
        >
          {t("tagline")}
        </motion.p>
      </Container>
    </section>
  );
}
