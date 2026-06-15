"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function FooterCtaBand() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  // Don't show on pages that already have their own merged CTA section
  if (pathname.endsWith("/cotation") || pathname.endsWith("/services")) return null;

  const href = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-baltic py-16">
      <Container className="text-center">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-aqua mb-3" translate="no">
          Total Klean
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
          {locale === "fr"
            ? "Prêt à redonner de l'éclat à votre véhicule ?"
            : "Ready to restore your vehicle's brilliance?"}
        </h2>
        <Link
          href={href("/cotation")}
          className="inline-block px-8 py-4 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors duration-200"
        >
          {t("common.getQuote")}
        </Link>
      </Container>
    </div>
  );
}
