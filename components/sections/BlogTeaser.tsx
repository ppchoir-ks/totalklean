"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const posts = [
  {
    slug: "nettoyage-regulier-essentiel",
    image: "/assets/blog/blog-lavage.jpg",
    tag: "Lavage",
    fr: {
      title: "Entretenir son véhicule : Pourquoi un nettoyage régulier est-il essentiel ?",
      excerpt: "Un entretien régulier préserve la valeur de votre véhicule et prolonge sa durée de vie. Découvrez pourquoi.",
    },
    en: {
      title: "Vehicle Maintenance: Why Regular Cleaning Is Essential",
      excerpt: "Regular maintenance preserves your vehicle's value and extends its lifespan. Find out why.",
    },
  },
  {
    slug: "polissage-excellence-total-klean",
    image: "/assets/blog/blog-polissage.jpg",
    tag: "Polissage",
    fr: {
      title: "Polissage automobile : L'excellence signée Total Klean",
      excerpt: "Notre technique de polissage redonne à votre carrosserie l'éclat du neuf en éliminant rayures et oxydation.",
    },
    en: {
      title: "Car Polishing: Excellence by Total Klean",
      excerpt: "Our polishing technique restores your bodywork's showroom shine by eliminating scratches and oxidation.",
    },
  },
  {
    slug: "total-klean-mobile-innovation-goma",
    image: "/assets/blog/blog-mobile.jpg",
    tag: "Mobile",
    fr: {
      title: "Total Klean Mobile : L'innovation au service du nettoyage automobile à Goma",
      excerpt: "Nous apportons nos services directement à vous — à domicile ou au bureau, partout dans Goma.",
    },
    en: {
      title: "Total Klean Mobile: Innovation in Car Cleaning in Goma",
      excerpt: "We bring our services directly to you — at home or at the office, anywhere in Goma.",
    },
  },
];

export function BlogTeaser() {
  const t = useTranslations("blog");
  const locale = useLocale() as "fr" | "en";

  return (
    <section className="py-14 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Blog"
            heading={t("heading")}
            subtext={t("subtext")}
            align="left"
            className="max-w-xl"
          />
          <Link
            href={`/${locale}/blog`}
            className="flex-shrink-0 inline-flex items-center gap-2 font-body text-sm font-semibold text-baltic hover:text-amber transition-colors"
          >
            {locale === "fr" ? "Voir tous les articles" : "View all articles"}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white rounded-card overflow-hidden border border-black/5 hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post[locale].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-baltic font-body text-xs font-semibold px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-obsidian text-base leading-snug mb-3 group-hover:text-baltic transition-colors line-clamp-2">
                    {post[locale].title}
                  </h3>
                  <p className="font-body text-sm text-obsidian/55 leading-relaxed line-clamp-2 flex-1">
                    {post[locale].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 font-body text-xs font-semibold text-baltic group-hover:text-amber transition-colors">
                    {t("cta")} <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
