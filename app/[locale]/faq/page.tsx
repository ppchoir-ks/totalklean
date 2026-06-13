"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const faqs = {
  fr: [
    {
      q: "Combien de temps dure un lavage complet ?",
      a: "Un lavage basique et complet prend généralement entre 1h30 et 3h selon la taille du véhicule et son état initial. Le polissage et la protection céramique peuvent nécessiter 1 à 2 jours supplémentaires.",
    },
    {
      q: "Dois-je apporter mon véhicule ou venez-vous chez moi ?",
      a: "Les deux options sont disponibles ! Vous pouvez nous amener votre véhicule à notre atelier (N°16, Rue Rachidi Tumbula, Goma) ou bénéficier de notre service Total Klean Mobile — nous nous déplaçons directement chez vous.",
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
      a: "Both options are available! You can bring your vehicle to our workshop (N°16, Rue Rachidi Tumbula, Goma) or use our Total Klean Mobile service — we come directly to you.",
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading font-semibold text-obsidian text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-baltic mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-sm text-obsidian/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      <section className="py-24 bg-white">
        <Container className="max-w-3xl">
          <div>
            {faqs[locale].map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
          <div className="mt-14 bg-baltic/5 border border-baltic/10 rounded-card p-7 text-center">
            <p className="font-heading font-semibold text-obsidian text-lg mb-2">
              {locale === "fr" ? "Vous n'avez pas trouvé votre réponse ?" : "Didn't find your answer?"}
            </p>
            <p className="font-body text-sm text-obsidian/55 mb-5">
              {locale === "fr"
                ? "Contactez-nous directement — nous serons ravis de vous aider."
                : "Contact us directly — we'll be happy to help."}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-block px-6 py-3 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
