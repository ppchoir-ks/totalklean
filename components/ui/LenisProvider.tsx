"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// SSR-safe: useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's native scroll restoration so we fully control it
    window.history.scrollRestoration = "manual";

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf: number;
    function animate(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On every route change, jump to the right starting position before paint.
  // If the URL carries a hash (e.g. /services#ceramique), scroll to that
  // section instead of the top — otherwise reset to 0 so whileInView
  // animations always start fresh.
  useIsomorphicLayoutEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -80, immediate: true });
      } else {
        target.scrollIntoView();
      }
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
