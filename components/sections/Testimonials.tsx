"use client";

import { useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Daniel Bahati",
    initials: "DB",
    colorFrom: "#285889",
    colorTo: "#47A4C3",
    text: "Je ne pensais pas retrouver mon véhicule dans un tel état après tant d'années ! Grâce au service de polissage de Total Klean, ma voiture est aussi belle qu'à son état neuf. C'est vraiment la référence pour redonner vie à votre véhicule.",
    service: "Polissage",
  },
  {
    name: "Oscar Bawili",
    initials: "OB",
    colorFrom: "#47A4C3",
    colorTo: "#1a4f7a",
    text: "Dès mon arrivée dans les locaux de Total Klean, j'ai été impressionné par l'accueil chaleureux et le professionnalisme. Mon véhicule a bénéficié d'un lavage intérieur impeccable, le service était tout simplement unique. Une expérience que je recommande à tous !",
    service: "Lavage intérieur",
  },
  {
    name: "Nadine Wembi",
    initials: "NW",
    colorFrom: "#EF762F",
    colorTo: "#285889",
    text: "Mes phares étaient ternes et abîmés, ce qui enlevait tout le charme à ma voiture. Après la révision chez Total Klean, ils brillent à nouveau, et mon véhicule a retrouvé sa beauté d'antan. Merci pour ce service incroyable !",
    service: "Rénovation des phares",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#EF762F" width="14" height="14">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Testimonial {
  name: string;
  initials: string;
  colorFrom: string;
  colorTo: string;
  text: string;
  service: string;
}

function TestimonialCard({ name, initials, colorFrom, colorTo, text, service, onClick }: Testimonial & { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[300px] bg-white rounded-card overflow-hidden cursor-pointer
                 shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.13)]
                 hover:-translate-y-1 transition-all duration-300 mr-6 select-none"
    >
      {/* Gradient avatar block */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-8 w-52 h-52 rounded-full bg-white/10" />
        <span className="relative font-heading font-bold text-white/90 text-8xl tracking-tight select-none drop-shadow-sm">
          {initials}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-heading font-bold text-obsidian text-base leading-snug">{name}</p>
        <p className="font-body text-xs text-obsidian/50 mt-0.5 mb-2">{service}</p>
        <Stars />
        <p className="font-body text-sm text-obsidian/70 leading-relaxed mt-3 line-clamp-5">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}

// 4 repetitions ensures the loop point is always reachable within the scrollable range
const NUM_REPS = 4;
const RESUME_DELAY = 7000; // ms

export function Testimonials() {
  const t = useTranslations("testimonials");
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const prevTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  }, []);

  const handleCardClick = useCallback(() => {
    pausedRef.current = true;
    scheduleResume();
  }, [scheduleResume]);

  // Only resets the resume timer when the user manually scrolls while paused.
  // The RAF loop also fires scroll events via scrollLeft assignment, but those
  // only occur when pausedRef.current is false, so the guard prevents false resets.
  const handleScroll = useCallback(() => {
    if (pausedRef.current) {
      scheduleResume();
    }
  }, [scheduleResume]);

  useEffect(() => {
    const step = (timestamp: number) => {
      const el = containerRef.current;
      if (el && !pausedRef.current) {
        const delta = prevTimeRef.current ? timestamp - prevTimeRef.current : 0;
        // 40 px/s; cap delta so a tab-switch doesn't cause a jump
        el.scrollLeft += 0.04 * Math.min(delta, 50);
        const loopPoint = el.scrollWidth / NUM_REPS;
        if (el.scrollLeft >= loopPoint) {
          el.scrollLeft -= loopPoint;
        }
      }
      prevTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const scrollManual = (dir: "left" | "right") => {
    pausedRef.current = true;
    scheduleResume();
    containerRef.current?.scrollBy({
      left: dir === "left" ? -330 : 330,
      behavior: "smooth",
    });
  };

  const items = Array.from({ length: NUM_REPS }, () => testimonials).flat();

  return (
    <section className="py-14 bg-[#f8f9fc] overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="Clients"
            heading={t("heading")}
            subtext={t("subtext")}
            align="left"
          />
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <button
              onClick={() => scrollManual("left")}
              className="w-10 h-10 rounded-full border border-baltic/20 flex items-center justify-center text-baltic hover:bg-baltic hover:text-white transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollManual("right")}
              className="w-10 h-10 rounded-full border border-baltic/20 flex items-center justify-center text-baltic hover:bg-baltic hover:text-white transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10" />

        <div
          ref={containerRef}
          className="flex overflow-x-scroll pb-6 px-8 scrollbar-hide"
          onScroll={handleScroll}
        >
          {items.map((item, i) => (
            <TestimonialCard key={i} {...item} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
