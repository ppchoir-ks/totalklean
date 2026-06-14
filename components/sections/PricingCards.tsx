"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  eyebrow: { fr: string; en: string };
  label: { fr: string; en: string };
  price: { fr: string; en: string };
  priceNote: { fr: string; en: string };
  points: Array<{ fr: string; en: string }>;
  featured?: boolean;
  whatsappMsg: { fr: string; en: string };
}

const mainPlans: Plan[] = [
  {
    id: "exterieur",
    eyebrow: { fr: "Extérieur", en: "Exterior" },
    label: { fr: "Lavage Extérieur", en: "Exterior Wash" },
    price: { fr: "5$", en: "$5" },
    priceNote: {
      fr: "Berline & SUV & Jeep\nGros Véhicules : 7$",
      en: "Sedan & SUV & Jeep\nLarge Vehicles: $7",
    },
    points: [
      { fr: "Savon liquide approprié", en: "Appropriate liquid soap" },
      { fr: "Rinçage haute pression", en: "High-pressure rinse" },
      { fr: "Sans taches", en: "Spot-free finish" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver un Lavage Extérieur.",
      en: "Hello Total Klean, I'd like to book an Exterior Wash.",
    },
  },
  {
    id: "mobile",
    eyebrow: { fr: "Service phare", en: "Flagship" },
    label: { fr: "Total Klean Mobile", en: "Total Klean Mobile" },
    price: { fr: "Sur devis", en: "On request" },
    priceNote: {
      fr: "Tous services — livrés chez vous",
      en: "All services — delivered to you",
    },
    points: [
      { fr: "Déplacement domicile ou bureau", en: "Home or office visit" },
      { fr: "Tous nos services disponibles", en: "All services available" },
      { fr: "Équipements pro transportés", en: "Pro equipment on-site" },
      { fr: "Partout dans Goma & environs", en: "Anywhere in Goma & surrounds" },
    ],
    featured: true,
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver le service Mobile.",
      en: "Hello Total Klean, I'd like to book the Mobile service.",
    },
  },
  {
    id: "interieur",
    eyebrow: { fr: "Intérieur", en: "Interior" },
    label: { fr: "Nettoyage Intérieur", en: "Interior Cleaning" },
    price: { fr: "5$", en: "$5" },
    priceNote: {
      fr: "Berline & SUV & Jeep\nGros Véhicules : 10$",
      en: "Sedan & SUV & Jeep\nLarge Vehicles: $10",
    },
    points: [
      { fr: "Aspiration complète", en: "Complete vacuuming" },
      { fr: "Nettoyage antibactérien", en: "Antibacterial cleaning" },
      { fr: "Séchage soigné", en: "Careful drying" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver un Nettoyage Intérieur.",
      en: "Hello Total Klean, I'd like to book an Interior Cleaning.",
    },
  },
];

const morePlans: Plan[] = [
  {
    id: "moteur",
    eyebrow: { fr: "Mécanique", en: "Mechanical" },
    label: { fr: "Nettoyage Moteur", en: "Engine Cleaning" },
    price: { fr: "5$", en: "$5" },
    priceNote: {
      fr: "Berline & SUV & Jeep\nGros Véhicules : 7$",
      en: "Sedan & SUV & Jeep\nLarge Vehicles: $7",
    },
    points: [
      { fr: "Dégraissage efficace", en: "Effective degreasing" },
      { fr: "Sans résidus nocifs", en: "No harmful residues" },
      { fr: "Protection durable", en: "Durable protection" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver un Nettoyage Moteur.",
      en: "Hello Total Klean, I'd like to book an Engine Cleaning.",
    },
  },
  {
    id: "phares",
    eyebrow: { fr: "Optiques", en: "Optics" },
    label: { fr: "Restauration des phares", en: "Headlight Restoration" },
    price: { fr: "7$", en: "$7" },
    priceNote: {
      fr: "Berline, SUV, Jeep &\nGros Véhicules",
      en: "Sedan, SUV, Jeep &\nLarge Vehicles",
    },
    points: [
      { fr: "Éclat d'origine restauré", en: "Original brilliance restored" },
      { fr: "Vision nocturne optimisée", en: "Night vision optimised" },
      { fr: "Finition protectrice durable", en: "Durable protective finish" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver une Restauration des Phares.",
      en: "Hello Total Klean, I'd like to book a Headlight Restoration.",
    },
  },
  {
    id: "polissage",
    eyebrow: { fr: "Carrosserie", en: "Bodywork" },
    label: { fr: "Polissage", en: "Polishing" },
    price: { fr: "40$", en: "$40" },
    priceNote: {
      fr: "Berline. SUV & Jeep : 50$\nGros Véhicules : 55$",
      en: "Sedan. SUV & Jeep: $50\nLarge Vehicles: $55",
    },
    points: [
      { fr: "Brillance intense", en: "Intense shine" },
      { fr: "Micro-rayures réduites", en: "Swirl marks reduced" },
      { fr: "Protection longue durée", en: "Long-lasting protection" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver un service de Polissage.",
      en: "Hello Total Klean, I'd like to book a Polishing service.",
    },
  },
  {
    id: "ceramique",
    eyebrow: { fr: "Protection", en: "Protection" },
    label: { fr: "Protection Céramique", en: "Ceramic Protection" },
    price: { fr: "25$", en: "$25" },
    priceNote: {
      fr: "Berline. SUV & Jeep : 35$\nGros Véhicules : 45$",
      en: "Sedan. SUV & Jeep: $35\nLarge Vehicles: $45",
    },
    points: [
      { fr: "Effet hydrophobe déperlant", en: "Water-repellent effect" },
      { fr: "Brillance amplifiée & durable", en: "Amplified & lasting shine" },
      { fr: "Bouclier anti-UV & rayures", en: "UV & scratch shield" },
    ],
    whatsappMsg: {
      fr: "Bonjour Total Klean, je souhaite réserver une Protection Céramique.",
      en: "Hello Total Klean, I'd like to book a Ceramic Protection.",
    },
  },
];

function PlanCard({ plan, lang, compact = false }: { plan: Plan; lang: "fr" | "en"; compact?: boolean }) {
  const waLink = `https://wa.me/243997806193?text=${encodeURIComponent(plan.whatsappMsg[lang])}`;
  const p = compact ? "p-6" : "p-8";

  if (plan.featured) {
    return (
      <div className={cn("relative bg-obsidian rounded-3xl border border-white/[0.06] overflow-hidden flex flex-col h-full shadow-[0_32px_80px_rgba(0,0,0,0.35)]", p)}>
        {/* Breathing glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-baltic/35 blur-[72px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-aqua/20 blur-[60px]"
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
              {plan.eyebrow[lang]}
            </p>
            <span className="flex items-center gap-1 bg-amber/15 text-amber font-body text-[11px] font-semibold px-3 py-1 rounded-full">
              <Sparkles size={9} />
              {lang === "fr" ? "Le plus populaire" : "Most popular"}
            </span>
          </div>

          <h3 className="font-heading font-bold text-white text-2xl leading-snug mb-5">
            {plan.label[lang]}
          </h3>

          <div className="mb-1">
            <span className={cn("font-heading font-black text-white leading-none", compact ? "text-4xl" : "text-5xl")}>
              {plan.price[lang]}
            </span>
          </div>
          <p className="font-body text-xs text-white/35 leading-relaxed mb-6 whitespace-pre-line">
            {plan.priceNote[lang]}
          </p>

          <div className="h-px bg-white/10 mb-6" />

          <ul className="space-y-3 flex-1 mb-8">
            {plan.points.map((pt) => (
              <li key={pt.fr} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                  <Check size={9} className="text-amber" strokeWidth={2.5} />
                </div>
                <span className="font-body text-sm text-white/65">{pt[lang]}</span>
              </li>
            ))}
          </ul>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber text-white font-body font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(239,118,47,0.35)] hover:shadow-[0_8px_32px_rgba(239,118,47,0.55)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-white/10" />
            <MessageCircle size={14} className="relative" />
            <span className="relative">{lang === "fr" ? "Réserver via WhatsApp" : "Book via WhatsApp"}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "group/card relative rounded-3xl border border-slate-100 flex flex-col h-full",
      "shadow-[0_4px_28px_rgba(40,88,137,0.07)]",
      // hover effects only on real pointer devices (desktop) — prevents touch-trigger glitch on mobile
      "lg:hover:border-baltic lg:hover:shadow-[0_20px_60px_rgba(40,88,137,0.28)]",
      "transition-[box-shadow,border-color] duration-300 ease-out",
      p
    )}>
      {/* Background overlay — opacity only, GPU-composited, desktop-only */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-baltic opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 ease-out" />

      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] mb-5 text-aqua lg:group-hover/card:text-white/50 transition-colors duration-300 ease-out">
          {plan.eyebrow[lang]}
        </p>

        <h3 className="font-heading font-bold text-2xl leading-snug mb-5 text-obsidian lg:group-hover/card:text-white transition-colors duration-300 ease-out">
          {plan.label[lang]}
        </h3>

        <div className="mb-1">
          <span className={cn("font-heading font-black leading-none text-obsidian lg:group-hover/card:text-white transition-colors duration-300 ease-out", compact ? "text-4xl" : "text-5xl")}>
            {plan.price[lang]}
          </span>
          <span className="font-body text-sm ml-1 text-obsidian/30 lg:group-hover/card:text-white/40 transition-colors duration-300 ease-out">
            {lang === "fr" ? "/ véhicule" : "/ vehicle"}
          </span>
        </div>
        <p className="font-body text-xs leading-relaxed mb-6 whitespace-pre-line text-obsidian/35 lg:group-hover/card:text-white/45 transition-colors duration-300 ease-out">
          {plan.priceNote[lang]}
        </p>

        <div className="h-px mb-6 bg-slate-100 lg:group-hover/card:bg-white/15 transition-colors duration-300 ease-out" />

        <ul className="space-y-3 flex-1 mb-8">
          {plan.points.map((pt) => (
            <li key={pt.fr} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-baltic/10 lg:group-hover/card:bg-white/20 transition-colors duration-300 ease-out">
                <Check size={9} strokeWidth={2.5} className="text-baltic lg:group-hover/card:text-white transition-colors duration-300 ease-out" />
              </div>
              <span className="font-body text-sm text-obsidian/60 lg:group-hover/card:text-white/75 transition-colors duration-300 ease-out">{pt[lang]}</span>
            </li>
          ))}
        </ul>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-body font-semibold text-sm text-white bg-baltic lg:group-hover/card:bg-amber shadow-sm lg:group-hover/card:shadow-[0_4px_20px_rgba(239,118,47,0.4)] transition-[background-color,box-shadow] duration-300 ease-out"
        >
          {lang === "fr" ? "Réserver" : "Book now"}
        </a>
      </div>
    </div>
  );
}

export function PricingCards({ lang }: { lang: "fr" | "en" }) {
  const [showMore, setShowMore] = useState(false);
  const [moreOverflow, setMoreOverflow] = useState<"hidden" | "visible">("hidden");

  // Mobile carousel tracking
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / mainPlans.length;
      setActiveIdx(Math.min(Math.round(el.scrollLeft / cardW), mainPlans.length - 1));
      setHasSwiped(true);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * (el.scrollWidth / mainPlans.length), behavior: "smooth" });
  };

  // More carousel tracking
  const moreCarouselRef = useRef<HTMLDivElement>(null);
  const [moreActiveIdx, setMoreActiveIdx] = useState(0);
  const [moreHasSwiped, setMoreHasSwiped] = useState(false);

  useEffect(() => {
    const el = moreCarouselRef.current;
    if (!el || !showMore) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / morePlans.length;
      setMoreActiveIdx(Math.min(Math.round(el.scrollLeft / cardW), morePlans.length - 1));
      setMoreHasSwiped(true);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [showMore]);

  const scrollToMoreCard = (idx: number) => {
    const el = moreCarouselRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * (el.scrollWidth / morePlans.length), behavior: "smooth" });
  };

  return (
    <div>
      {/* Mobile carousel (below lg) — horizontal snap scroll */}
      <div
        ref={carouselRef}
        className="lg:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {mainPlans.map((plan) => (
          <div key={plan.id} className="flex-none w-[82vw] max-w-xs snap-center">
            <PlanCard plan={plan} lang={lang} />
          </div>
        ))}
      </div>

      {/* Carousel indicators — swipe hint + tappable pill dots */}
      <div className="lg:hidden flex flex-col items-center gap-3 mt-5">
        {/* Animated swipe hint fades out after first scroll */}
        <AnimatePresence>
          {!hasSwiped && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1 text-baltic/45 font-body text-xs select-none"
            >
              <span>{lang === "fr" ? "Glisser" : "Swipe"}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              >
                <ChevronRight size={12} />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill dots — active dot stretches into a pill */}
        <div className="flex items-center gap-1.5">
          {mainPlans.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Service ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300 ease-out",
                i === activeIdx
                  ? "w-6 h-2 bg-baltic shadow-[0_0_8px_rgba(40,88,137,0.35)]"
                  : "w-2 h-2 bg-slate-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop 3-column grid with staggered entrance (lg+) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-start">
        {mainPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className={cn("flex flex-col", plan.featured ? "lg:-mt-5" : "lg:mt-5")}
          >
            <PlanCard plan={plan} lang={lang} />
          </motion.div>
        ))}
      </div>

      {/* Toggle button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center mt-10"
      >
        <button
          onClick={() => {
            const next = !showMore;
            if (!next) setMoreOverflow("hidden"); // reset before exit animation
            setShowMore(next);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-baltic/20 bg-white text-baltic font-body text-sm font-semibold hover:border-baltic/50 hover:bg-baltic/5 transition-all duration-200 shadow-sm"
        >
          {lang === "fr"
            ? showMore ? "Voir moins de services" : "Voir tous les services"
            : showMore ? "Show fewer services" : "View all services"}
          <motion.span
            animate={{ rotate: showMore ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChevronDown size={15} />
          </motion.span>
        </button>
      </motion.div>

      {/* Expandable additional cards */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: moreOverflow }}
            onAnimationComplete={() => { if (showMore) setMoreOverflow("visible"); }}
          >
            {/* Mobile carousel for more cards */}
            <div
              ref={moreCarouselRef}
              className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory mt-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {morePlans.map((plan) => (
                <div key={plan.id} className="flex-none w-[75vw] max-w-[240px] snap-center">
                  <PlanCard plan={plan} lang={lang} compact />
                </div>
              ))}
            </div>

            {/* More carousel indicators */}
            <div className="lg:hidden flex flex-col items-center gap-3 mt-5">
              <AnimatePresence>
                {!moreHasSwiped && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-1 text-baltic/45 font-body text-xs select-none"
                  >
                    <span>{lang === "fr" ? "Glisser" : "Swipe"}</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                    >
                      <ChevronRight size={12} />
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-1.5">
                {morePlans.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToMoreCard(i)}
                    aria-label={`Service ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300 ease-out",
                      i === moreActiveIdx
                        ? "w-6 h-2 bg-baltic shadow-[0_0_8px_rgba(40,88,137,0.35)]"
                        : "w-2 h-2 bg-slate-300"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Desktop grid for more cards (lg+) */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5 mt-8 pb-4 px-1">
              {morePlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PlanCard plan={plan} lang={lang} compact />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
