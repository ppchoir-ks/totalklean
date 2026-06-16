"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: { fr: string; en: string };
  experience?: { fr: string; en: string };
  image?: string;
  initials: string;
  colorFrom: string;
  colorTo: string;
}

interface Props {
  members: TeamMember[];
  lang: "fr" | "en";
  bg?: string;
}

const SPEED = 0.04; // px/ms

const CARD_WIDTH = 220; // 200px card + 20px margin (mr-5)

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
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const prevTimeRef = useRef<number>(0);
  const offsetRef   = useRef(0);
  const pausedRef   = useRef(false);

  const pause   = useCallback(() => { pausedRef.current = true;  }, []);
  const resume  = useCallback(() => { pausedRef.current = false; }, []);

  const loopWidth = members.length * CARD_WIDTH;

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!pausedRef.current && trackRef.current) {
        const delta = prevTimeRef.current ? timestamp - prevTimeRef.current : 0;
        offsetRef.current -= SPEED * Math.min(delta, 50);
        if (Math.abs(offsetRef.current) >= loopWidth) offsetRef.current = 0;
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      prevTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, [loopWidth]);

  const items = [...members, ...members];

  return (
    <div className="relative overflow-hidden">
      {/* Liquid glass edge blur */}
      <div
        className="absolute left-0 top-0 bottom-0 w-14 sm:w-20 z-10 pointer-events-none"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-14 sm:w-20 z-10 pointer-events-none"
        style={{
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
          maskImage: "linear-gradient(to left, black 20%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black 20%, transparent)",
        }}
      />
      <div
        ref={trackRef}
        className="flex pb-4 px-6 will-change-transform"
        style={{ width: "max-content" }}
        onMouseDown={pause}
        onMouseUp={resume}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onTouchCancel={resume}
      >
        {items.map((member, i) => (
          <MemberCard key={i} member={member} lang={lang} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
