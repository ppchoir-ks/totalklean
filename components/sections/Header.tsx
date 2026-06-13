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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const localizedHref = (path: string) => `/${locale}${path}`;
  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href={localizedHref("/")} className="flex-shrink-0">
          <Image
            src="/assets/brand/logo-landscape.png"
            alt="Total Klean"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.key)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors",
                    scrolled
                      ? "text-obsidian hover:text-baltic"
                      : "text-white hover:text-aqua"
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
                </button>

                <AnimatePresence>
                  {openDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 bg-white rounded-card shadow-lg border border-black/5 py-2 min-w-52 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={localizedHref(child.href)}
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
                className={cn(
                  "px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors",
                  scrolled
                    ? "text-obsidian hover:text-baltic"
                    : "text-white hover:text-aqua"
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
              "flex items-center gap-1.5 px-3 py-2 rounded-lg font-body text-sm font-medium transition-colors",
              scrolled
                ? "text-obsidian/60 hover:text-baltic"
                : "text-white/70 hover:text-white"
            )}
          >
            <Globe size={14} />
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={localizedHref("/cotation")}
            className="px-5 py-2.5 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-baltic transition-colors duration-200"
          >
            {t("quote")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-obsidian" : "text-white"
          )}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-white pt-20 px-6 pb-8 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  <Link
                    href={localizedHref(item.href)}
                    className="block py-3 font-heading text-lg font-semibold text-obsidian hover:text-baltic border-b border-black/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={localizedHref(child.href)}
                          className="block py-2 font-body text-sm text-obsidian/70 hover:text-baltic"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={otherLocalePath}
                  className="flex items-center gap-2 py-2 font-body text-sm text-obsidian/60"
                >
                  <Globe size={14} />
                  {otherLocale === "fr" ? "Français" : "English"}
                </Link>
                <Link
                  href={localizedHref("/cotation")}
                  className="w-full text-center py-3 bg-amber text-white font-body font-semibold rounded-btn hover:bg-baltic transition-colors"
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
