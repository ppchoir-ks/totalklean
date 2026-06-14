"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionBlobs } from "@/components/ui/GlassCard";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = {
  fr: [
    {
      q: "Combien de temps dure un lavage complet ?",
      a: "Un lavage basique et complet prend généralement entre 1h30 et 3h selon la taille du véhicule et son état initial. Le polissage et la protection céramique peuvent nécessiter 1 à 2 jours supplémentaires.",
    },
    {
      q: "Dois-je apporter mon véhicule ou venez-vous chez moi ?",
      a: "Les deux options sont disponibles ! Vous pouvez nous amener votre véhicule à notre atelier (N°16, Rue Rachidi Tumbula, Goma) ou bénéficier de notre service Total Klean Mobile : nous nous déplaçons directement chez vous.",
    },
    {
      q: "Quels types de véhicules acceptez-vous ?",
      a: "Nous traitons tous types de véhicules : berlines, SUV, 4x4, pick-up, minibus et véhicules de luxe. Nos produits et techniques sont adaptés à chaque type de peinture et de finition.",
    },
    {
      q: "La protection céramique est-elle durable ?",
      a: "Oui. Une protection céramique correctement appliquée dure entre 2 et 5 ans selon l'entretien et les conditions d'utilisation. Elle facilite également le nettoyage quotidien en repoussant l'eau et la saleté.",
    },
    {
      q: "Les produits que vous utilisez sont-ils sûrs pour ma peinture ?",
      a: "Absolument. Nous utilisons exclusivement des produits professionnels de haute qualité, homologués et adaptés aux différents types de peinture automobile, pour garantir des résultats irréprochables sans endommager votre véhicule.",
    },
    {
      q: "Comment puis-je obtenir une cotation ?",
      a: "Remplissez notre formulaire de cotation en ligne, contactez-nous par WhatsApp au +243 997 806 193, ou envoyez-nous un e-mail à contact@totalklean.com. Nous vous répondons sous 24 heures avec une estimation personnalisée.",
    },
  ],
  en: [
    {
      q: "How long does a full wash take?",
      a: "A basic and full wash generally takes between 1.5 and 3 hours depending on the size of the vehicle and its initial condition. Polishing and ceramic protection may require an additional 1 to 2 days.",
    },
    {
      q: "Do I bring my vehicle or do you come to me?",
      a: "Both options are available! You can bring your vehicle to our workshop (N°16, Rue Rachidi Tumbula, Goma) or use our Total Klean Mobile service: we come directly to you.",
    },
    {
      q: "What types of vehicles do you accept?",
      a: "We handle all types of vehicles: sedans, SUVs, 4x4s, pick-ups, minibuses and luxury vehicles. Our products and techniques are adapted to each type of paint and finish.",
    },
    {
      q: "Is ceramic protection long-lasting?",
      a: "Yes. Correctly applied ceramic protection lasts between 2 and 5 years depending on maintenance and conditions of use. It also makes daily cleaning easier by repelling water and dirt.",
    },
    {
      q: "Are the products you use safe for my paint?",
      a: "Absolutely. We exclusively use high-quality professional products, approved and adapted to the different types of automotive paint, to guarantee flawless results without damaging your vehicle.",
    },
    {
      q: "How can I get a quote?",
      a: "Fill in our online quote form, contact us via WhatsApp at +243 997 806 193, or email us at contact@totalklean.com. We'll get back to you within 24 hours with a personalised estimate.",
    },
  ],
};

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        open
          ? "bg-white/90 backdrop-blur-md border-baltic/20 shadow-[0_12px_40px_rgba(40,88,137,0.12)]"
          : "bg-white/70 backdrop-blur-sm border-white/60 shadow-[0_4px_20px_rgba(40,88,137,0.06)] hover:shadow-[0_8px_32px_rgba(40,88,137,0.1)] hover:-translate-y-0.5"
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 px-7 py-5 text-left"
      >
        <span className="font-heading font-semibold text-obsidian text-base">{q}</span>
        <ChevronDown
          size={18}
          className={cn(
            "flex-shrink-0 text-baltic mt-0.5 transition-transform duration-300",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-6 font-body text-sm text-obsidian/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const locale = useLocale() as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        heading={locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
        subtext={locale === "fr"
          ? "Tout ce que vous devez savoir sur nos services."
          : "Everything you need to know about our services."}
      />

      <section className="relative py-16 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="cool" />
        <Container className="relative z-10 max-w-3xl">
          <div className="space-y-3 mb-8">
            {faqs[locale].map((item, i) => (
              <FAQItem key={item.q} {...item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(40,88,137,0.1)] rounded-2xl p-8 text-center"
          >
            <p className="font-heading font-bold text-obsidian text-xl mb-2">
              {locale === "fr" ? "Vous n'avez pas trouvé votre réponse ?" : "Didn't find your answer?"}
            </p>
            <p className="font-body text-sm text-obsidian/50 mb-6">
              {locale === "fr"
                ? "Contactez-nous directement, nous serons ravis de vous aider."
                : "Contact us directly, we'll be happy to help."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-7 py-3 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors duration-200 shadow-md"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
