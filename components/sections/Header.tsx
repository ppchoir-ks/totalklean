"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
}

const navItems: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "about",
    href: "/a-propos",
    children: [
      { key: "who", href: "/a-propos#qui-sommes-nous" },
      { key: "team", href: "/a-propos#equipe" },
    ],
  },
  {
    key: "services",
    href: "/services",
    children: [
      { key: "wash", href: "/services#lavage" },
      { key: "paint", href: "/services#correction-peinture" },
      { key: "ceramic", href: "/services#ceramique" },
      { key: "headlights", href: "/services#phares" },
      { key: "engine", href: "/services#moteur" },
      { key: "mobile", href: "/services#mobile" },
    ],
  },
  { key: "quote", href: "/cotation" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const localizedHref = (path: string) => `/${locale}${path}`;
  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  // Normalize path for comparison: strip trailing slash, treat "" as "/"
  const normPath = (p: string) => p.replace(/\/$/, "") || "/";

  // Same-page nav: scroll to section or top smoothly; different page: navigate normally
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = localizedHref(href);
    const [targetPath, hash] = target.split("#");
    if (normPath(pathname.split("#")[0]) === normPath(targetPath)) {
      e.preventDefault();
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 transition-all duration-300">
      {/* Horizontal blur-drop behind the logo row - fades to transparent */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-24 pointer-events-none transition-opacity duration-300",
          scrolled ? "opacity-0" : "opacity-100"
        )}
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
      />
      <Container className="flex items-center justify-between relative z-10">
        {/* Logo - glass bubble appears only once scrolling starts */}
        <Link
          href={localizedHref("/")}
          onClick={(e) => handleNavClick(e, "/")}
          className={cn(
            "flex-shrink-0 flex items-center gap-2 transition-all duration-300",
            scrolled
              ? "bg-white/85 backdrop-blur-xl border border-black/8 shadow-sm px-2.5 py-1.5 rounded-full"
              : ""
          )}
        >
          {/* Icon mark */}
          <Image
            src="/assets/brand/logo-icon.png"
            alt=""
            width={32}
            height={32}
            className={cn(
              "object-contain transition-all duration-300 flex-shrink-0",
              "h-9 w-9 sm:h-10 sm:w-10"
            )}
            priority
          />
          {/* Wordmark rendered with brand fonts */}
          <span
            translate="no"
            className={cn(
              "font-heading font-bold leading-none transition-all duration-300 select-none",
              scrolled ? "text-sm" : "text-xl sm:text-2xl"
            )}
          >
            <span className={scrolled ? "text-obsidian" : "text-white"}>Total </span>
            <span className="text-amber italic">Klean</span>
          </span>
        </Link>

        {/* Desktop nav - liquid glass pill */}
        <nav
          className={cn(
            "hidden lg:flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-300",
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-black/8 shadow-lg"
              : "bg-white/10 backdrop-blur-md border border-white/25"
          )}
        >
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.key)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={localizedHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors",
                    scrolled
                      ? "text-obsidian hover:text-baltic"
                      : "text-white hover:text-white/70"
                  )}
                >
                  {t(item.key)}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      openDropdown === item.key ? "rotate-180" : ""
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {openDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-xl rounded-card shadow-xl border border-black/5 py-2 min-w-52 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={localizedHref(child.href)}
                          onClick={(e) => handleNavClick(e, child.href)}
                          className="block px-4 py-2.5 font-body text-sm text-obsidian hover:text-baltic hover:bg-baltic/5 transition-colors"
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.key}
                href={localizedHref(item.href)}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors",
                  scrolled
                    ? "text-obsidian hover:text-baltic"
                    : "text-white hover:text-white/70"
                )}
              >
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={otherLocalePath}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-sm font-medium transition-all duration-300",
              scrolled
                ? "text-obsidian/70 hover:text-baltic bg-white/80 backdrop-blur-xl border border-black/8 shadow-lg hover:bg-white"
                : "text-white/90 hover:text-white bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20"
            )}
          >
            <Globe size={14} />
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={localizedHref("/cotation")}
            className="px-5 py-2.5 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-baltic transition-colors duration-200 shadow-sm"
          >
            {t("quote")}
          </Link>
        </div>

        {/* Mobile hamburger - glass bubble always visible on any background */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-sm",
            mobileOpen
              ? "bg-white text-obsidian border-black/10 shadow-md"
              : scrolled
              ? "bg-white/85 text-obsidian border-black/8"
              : "bg-white/20 text-white border-white/35"
          )}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile menu - dark glass floating panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.05 }}
            className="fixed top-20 inset-x-4 z-40 bg-obsidian/92 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col p-4 max-h-[75vh] overflow-y-auto scrollbar-hide">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.key}>
                    <div className="flex items-center border-b border-white/10">
                      <Link
                        href={localizedHref(item.href)}
                        onClick={(e) => { handleNavClick(e, item.href); setMobileOpen(false); }}
                        className="flex-1 py-3.5 font-heading text-base font-semibold text-white"
                      >
                        {t(item.key)}
                      </Link>
                      <button
                        className="px-3 py-3.5 text-white/40"
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.key ? null : item.key
                          )
                        }
                        aria-label={`Afficher sous-menu`}
                      >
                        <ChevronDown
                          size={15}
                          className={cn(
                            "transition-transform duration-200",
                            mobileExpanded === item.key ? "rotate-180" : ""
                          )}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileExpanded === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.key}
                                href={localizedHref(child.href)}
                                className="block py-2.5 font-body text-sm text-white/55 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                                onClick={(e) => { handleNavClick(e, child.href); setMobileOpen(false); }}
                              >
                                {t(child.key)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    href={localizedHref(item.href)}
                    className="block py-3.5 font-heading text-base font-semibold text-white hover:text-aqua border-b border-white/10 last:border-0 transition-colors"
                    onClick={(e) => { handleNavClick(e, item.href); setMobileOpen(false); }}
                  >
                    {t(item.key)}
                  </Link>
                )
              )}

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3">
                <Link
                  href={otherLocalePath}
                  className="flex items-center gap-1.5 font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Globe size={13} />
                  {otherLocale === "fr" ? "Français" : "English"}
                </Link>
                <Link
                  href={localizedHref("/cotation")}
                  className="ml-auto px-5 py-2 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("quote")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
