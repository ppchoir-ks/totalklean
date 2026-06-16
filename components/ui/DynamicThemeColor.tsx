"use client";

import { useEffect } from "react";

/**
 * Updates the <meta name="theme-color"> tint to match whatever section is
 * currently under the status bar, so the iOS Safari status-bar band blends
 * seamlessly into the page instead of showing a gray void. This is the
 * closest in-browser equivalent of the standalone-PWA full-screen look —
 * the status bar itself can't be removed in a normal tab (iOS limitation),
 * but it can be made to disappear visually into the content.
 */
export function DynamicThemeColor() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;

    const fallback = "#17181A"; // dark hero / transparent sections

    const isTransparent = (c: string) =>
      !c ||
      c === "transparent" ||
      c === "rgba(0, 0, 0, 0)" ||
      /,\s*0\)$/.test(c);

    let raf = 0;
    const update = () => {
      raf = 0;
      // Sample a few px down the centre — directly beneath the status bar
      const x = Math.round(window.innerWidth / 2);
      const els = document.elementsFromPoint(x, 6);
      let color = fallback;
      for (const el of els) {
        if (!(el instanceof HTMLElement)) continue;
        const tag = el.tagName;
        if (tag === "HTML" || tag === "BODY") continue; // skip page-level bg
        if (el.closest("header")) continue; // skip the fixed header overlay
        const bg = getComputedStyle(el).backgroundColor;
        if (!isTransparent(bg)) {
          color = bg;
          break;
        }
      }
      if (meta.getAttribute("content") !== color) {
        meta.setAttribute("content", color);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
