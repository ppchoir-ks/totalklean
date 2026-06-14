"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "lavage",
    anchor: "#lavage",
    image: "/assets/services/lavage.jpg",
    frLabel: "Lavage basique et complet",
    enLabel: "Basic & Full Wash",
    frDesc: "Nettoyage intérieur et extérieur minutieux, de la carrosserie aux moindres détails.",
    enDesc: "Thorough interior and exterior cleaning, from bodywork to the finest details.",
  },
  {
    id: "peinture",
    anchor: "#correction-peinture",
    image: "/assets/services/polissage.jpg",
    frLabel: "Correction de la peinture",
    enLabel: "Paint Correction",
    frDesc: "Élimination des rayures et oxydation pour retrouver une carrosserie impeccable.",
    enDesc: "Removal of scratches and oxidation to restore a flawless body finish.",
  },
  {
    id: "ceramique",
    anchor: "#ceramique",
    image: "/assets/services/ceramic.jpg",
    frLabel: "Protection céramique",
    enLabel: "Ceramic Protection",
    frDesc: "Revêtement hydrophobe longue durée qui protège et sublime votre véhicule.",
    enDesc: "Long-lasting hydrophobic coating that protects and enhances your vehicle.",
  },
  {
    id: "phares",
    anchor: "#phares",
    image: "/assets/services/phares.jpg",
    frLabel: "Rénovation des phares",
    enLabel: "Headlight Restoration",
    frDesc: "Restauration de la clarté et de l'éclat de vos optiques ternis ou jaunis.",
    enDesc: "Restoring clarity and brilliance to your clouded or yellowed headlights.",
  },
  {
    id: "moteur",
    anchor: "#moteur",
    image: "/assets/services/moteur.jpg",
    frLabel: "Nettoyage moteur",
    enLabel: "Engine Cleaning",
    frDesc: "Dégraissage en profondeur du compartiment moteur pour un entretien optimal.",
    enDesc: "Deep degreasing of the engine compartment for optimal maintenance.",
  },
  {
    id: "mobile",
    anchor: "#mobile",
    image: "/assets/services/mobile.jpg",
    frLabel: "Total Klean Mobile",
    enLabel: "Total Klean Mobile",
    frDesc: "Tous nos services livrés directement à votre porte, chez vous ou au bureau.",
    enDesc: "All our services delivered directly to your door, at home or at the office.",
    featured: true,
  },
];

const N = services.length;
const AUTO_DELAY    = 3000;   // ms between auto-advances (normal cards)
const MOBILE_DELAY  = 7000;   // ms for the Total Klean Mobile card (featured)
const CLICK_PAUSE   = 6000;   // ms to stay paused after a user interaction
const EASE = "cubic-bezier(0.4,0,0.2,1)";
const DURATION = "0.65s";

function cardStyle(diff: number) {
  if (diff === 0) return { flexGrow: 5, mr: 10, opacity: 1 };
  if (diff === 1) return { flexGrow: 1.8, mr: 10, opacity: 1 };
  if (diff === 2) return { flexGrow: 1, mr: 0, opacity: 1 };
  return { flexGrow: 0, mr: 0, opacity: 0 };
}

export function ServicesGrid() {
  const [active, setActive] = useState(0);
  const autoTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userPausedRef = useRef(false);
  const activeRef     = useRef(0); // mirrors `active` so callbacks always read the latest value
  const t = useTranslations("services");
  const locale = useLocale();

  // Keep activeRef in sync so the pause-timer callback can read the current card.
  useEffect(() => { activeRef.current = active; }, [active]);

  // Schedule the next automatic card advance. Uses a longer delay for the featured card.
  const scheduleAutoAdvance = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    const delay = services[activeRef.current]?.featured ? MOBILE_DELAY : AUTO_DELAY;
    autoTimerRef.current = setTimeout(() => {
      setActive((p) => (p + 1) % N);
    }, delay);
  }, []);

  // Called on every user interaction (card click, dot click).
  // Cancels the pending auto-advance and schedules a resume after CLICK_PAUSE ms.
  const handleUserInteraction = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    userPausedRef.current = true;

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      userPausedRef.current = false;
      scheduleAutoAdvance();
    }, CLICK_PAUSE);
  }, [scheduleAutoAdvance]);

  // Re-schedule auto-advance whenever `active` changes, but skip if user is paused.
  useEffect(() => {
    if (!userPausedRef.current) scheduleAutoAdvance();
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, [active, scheduleAutoAdvance]);

  // Cleanup pause timer on unmount
  useEffect(() => {
    return () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); };
  }, []);

  const handleSelect = useCallback((i: number) => {
    setActive(i);
    handleUserInteraction();
  }, [handleUserInteraction]);

  return (
    <section className="py-14 bg-[#f8f9fc]">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
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
      </Container>

      {/* Carousel - no CSS gap; margins are managed per-card so collapsed cards leave no dead space */}
      <div className="overflow-hidden px-4 sm:px-8 lg:px-16">
        <div className="flex" style={{ height: "420px" }}>
          {services.map((svc, i) => {
            const diff = i - active;
            const { flexGrow, mr, opacity } = cardStyle(diff);
            const isActive = diff === 0;
            const isVisible = diff >= 0 && diff <= 2;
            const label = locale === "fr" ? svc.frLabel : svc.enLabel;
            const desc  = locale === "fr" ? svc.frDesc  : svc.enDesc;

            return (
              <div
                key={svc.id}
                onClick={() => { if (isVisible && !isActive) handleSelect(i); }}
                style={{
                  flex: `${flexGrow} ${flexGrow} 0`,
                  minWidth: 0,
                  overflow: "hidden",
                  borderRadius: "16px",
                  position: "relative",
                  opacity,
                  marginRight: `${mr}px`,
                  cursor: isVisible && !isActive ? "pointer" : "default",
                  transition: `flex ${DURATION} ${EASE}, margin ${DURATION} ${EASE}, opacity 0.4s ease`,
                }}
              >
                {/* Background image */}
                <Image
                  src={svc.image}
                  alt={label}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: isActive ? "none" : "saturate(0.15) brightness(0.5)",
                    transform: isActive ? "scale(1)" : "scale(1.06)",
                    transition: `filter ${DURATION} ${EASE}, transform ${DURATION} ${EASE}`,
                  }}
                  sizes="(max-width: 768px) 80vw, 55vw"
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.68) 100%)"
                      : "rgba(0,0,0,0.18)",
                    transition: `background ${DURATION} ${EASE}`,
                  }}
                />

                {/* Active card content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={`c-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, delay: 0.22 }}
                      className="absolute inset-0 p-7 sm:p-8 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl leading-tight max-w-[72%]">
                          {label}
                        </h3>
                        <Link
                          href={`/${locale}/services${svc.anchor}`}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 mt-1 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center hover:bg-amber transition-colors duration-200 shadow-md"
                        >
                          <ArrowRight size={17} className="text-obsidian" />
                        </Link>
                      </div>

                      <p className="font-body text-sm text-white/70 leading-relaxed mt-3 max-w-[75%] line-clamp-3">
                        {desc}
                      </p>

                      <div className="mt-auto flex items-center gap-3 flex-wrap">
                        {svc.featured ? (
                          <a
                            href={`https://wa.me/243997806193?text=${encodeURIComponent(locale === "fr" ? "Bonjour Total Klean, je souhaite réserver le service Mobile." : "Hello Total Klean, I'd like to book the Mobile service.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber text-white font-body text-sm font-semibold rounded-full hover:bg-white hover:text-obsidian transition-colors duration-200 shadow-md"
                          >
                            <MessageCircle size={14} />
                            {locale === "fr" ? "Réserver via WhatsApp" : "Book via WhatsApp"}
                          </a>
                        ) : (
                          <span className="font-body text-xs text-white/35 capitalize tracking-wide">
                            {svc.id.replace("-", " ")}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Peek card: vertical title label */}
                {isVisible && !isActive && (
                  <div className="absolute inset-0 flex items-end justify-start p-4">
                    <span
                      className="font-heading font-semibold text-white/55 text-xs leading-tight"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              aria-label={`Service ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === active
                  ? "w-6 h-1.5 bg-baltic"
                  : "w-1.5 h-1.5 bg-baltic/25 hover:bg-baltic/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
