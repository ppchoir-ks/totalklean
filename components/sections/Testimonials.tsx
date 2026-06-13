"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Daniel Bahati",
    initials: "DB",
    color: "bg-baltic",
    text: "Je ne pensais pas retrouver mon véhicule dans un tel état après tant d'années ! Grâce au service de polissage de Total Klean, ma voiture est aussi belle qu'à son état neuf. C'est vraiment la référence pour redonner vie à votre véhicule.",
    service: "Polissage",
  },
  {
    name: "Oscar Bawili",
    initials: "OB",
    color: "bg-aqua",
    text: "Dès mon arrivée dans les locaux de Total Klean, j'ai été impressionné par l'accueil chaleureux et le professionnalisme. Mon véhicule a bénéficié d'un lavage intérieur impeccable, le service était tout simplement unique. Une expérience que je recommande à tous !",
    service: "Lavage intérieur",
  },
  {
    name: "Nadine Wembi",
    initials: "NW",
    color: "bg-amber",
    text: "Mes phares étaient ternes et abîmés, ce qui enlevait tout le charme à ma voiture. Après la révision chez Total Klean, ils brillent à nouveau, et mon véhicule a retrouvé sa beauté d'antan. Merci pour ce service incroyable !",
    service: "Rénovation des phares",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#EF762F" width="16" height="16">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="py-24 bg-[#f8f9fc]">
      <Container>
        <SectionHeading
          eyebrow="Clients"
          heading={t("heading")}
          subtext={t("subtext")}
          className="mb-14"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-card p-8 md:p-12 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`${testimonials[active].color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="font-heading font-bold text-white text-sm">
                    {testimonials[active].initials}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-obsidian">
                    {testimonials[active].name}
                  </p>
                  <p className="font-body text-xs text-obsidian/50 mt-0.5">
                    {testimonials[active].service}
                  </p>
                  <div className="mt-1.5">
                    <Stars />
                  </div>
                </div>
                <Quote
                  size={40}
                  className="ml-auto text-baltic/10 flex-shrink-0 hidden md:block"
                />
              </div>
              <p className="font-body text-obsidian/70 leading-relaxed text-base md:text-lg">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-baltic/20 flex items-center justify-center text-baltic hover:bg-baltic hover:text-white transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-baltic" : "w-2 bg-baltic/20"
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-baltic/20 flex items-center justify-center text-baltic hover:bg-baltic hover:text-white transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
