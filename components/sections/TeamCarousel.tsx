"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: { fr: string; en: string };
  experience?: { fr: string; en: string };
  image?: string; // set to undefined until real photos are provided
  initials: string;
  colorFrom: string;
  colorTo: string;
}

interface Props {
  members: TeamMember[];
  lang: "fr" | "en";
  /** Solid color for the scroll-edge fade. Must match the section background. */
  bg?: string;
}

const NUM_REPS = 4;
const RESUME_DELAY = 7000;
const SPEED = 0.04; // px / ms  ≈ 40 px/s

function MemberCard({
  member,
  lang,
  onClick,
}: {
  member: TeamMember;
  lang: "fr" | "en";
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[200px] bg-white rounded-2xl overflow-hidden
                 shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.13)]
                 hover:-translate-y-1.5 transition-all duration-300 mr-5 cursor-pointer select-none"
    >
      {/* Photo or gradient placeholder */}
      <div className="relative h-52 overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{ background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})` }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-6 w-40 h-40 rounded-full bg-white/10" />
            <span className="relative font-heading font-bold text-white/90 text-6xl tracking-tight select-none drop-shadow-sm">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pt-4 pb-5">
        <p className="font-heading font-bold text-obsidian text-base leading-tight">{member.name}</p>
        <p className="font-body text-xs text-obsidian/55 mt-0.5 leading-snug">{member.role[lang]}</p>
        {member.experience && (
          <p className="font-body text-xs font-semibold text-aqua mt-2">{member.experience[lang]}</p>
        )}
      </div>
    </div>
  );
}

export function TeamCarousel({ members, lang, bg = "white" }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const rafRef         = useRef<number>(0);
  const prevTimeRef    = useRef<number>(0);
  const pausedRef      = useRef(false);
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

  // Reset timer on manual scroll while paused (RAF scroll won't reach here when running)
  const handleScroll = useCallback(() => {
    if (pausedRef.current) scheduleResume();
  }, [scheduleResume]);

  useEffect(() => {
    const step = (timestamp: number) => {
      const el = containerRef.current;
      if (el && !pausedRef.current) {
        const delta = prevTimeRef.current ? timestamp - prevTimeRef.current : 0;
        el.scrollLeft += SPEED * Math.min(delta, 50);
        const loopPoint = el.scrollWidth / NUM_REPS;
        if (el.scrollLeft >= loopPoint) el.scrollLeft -= loopPoint;
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

  const items = Array.from({ length: NUM_REPS }, () => members).flat();

  const fade = `bg-${bg}`;

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute left-0 inset-y-0 w-20 z-10 bg-gradient-to-r to-transparent`}
        style={{ backgroundImage: `linear-gradient(to right, ${bg}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute right-0 inset-y-0 w-20 z-10"
        style={{ backgroundImage: `linear-gradient(to left, ${bg}, transparent)` }}
      />

      <div
        ref={containerRef}
        className="flex overflow-x-scroll pb-4 px-6 scrollbar-hide"
        onScroll={handleScroll}
      >
        {items.map((member, i) => (
          <MemberCard key={i} member={member} lang={lang} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
