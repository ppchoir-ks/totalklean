import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionBlobs } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { PricingCards } from "@/components/sections/PricingCards";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "cotation");
}

export default async function CotationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow={lang === "fr" ? "Transparent & sans surprise" : "Transparent & no surprises"}
        heading={lang === "fr" ? "Nos tarifs" : "Our pricing"}
        subtext={lang === "fr"
          ? "Des tarifs clairs pour chaque service. Réservez directement via WhatsApp ou demandez un devis personnalisé."
          : "Clear pricing for every service. Book directly via WhatsApp or request a custom quote."}
      />

      {/* ── Pricing cards ────────────────────────────────────────────────── */}
      <section className="relative py-12 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="cool" />
        <Container className="relative z-10">
          <FadeIn className="mb-12">
            <SectionHeading
              eyebrow={lang === "fr" ? "Tarifs 2024" : "2024 Pricing"}
              heading={lang === "fr" ? "Choisissez votre service" : "Choose your service"}
              subtext={lang === "fr"
                ? "Tous les prix sont en dollars américains. Les tarifs varient selon le type de véhicule."
                : "All prices are in US dollars. Rates vary by vehicle type."}
            />
          </FadeIn>
          <PricingCards lang={lang} />
        </Container>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-12 bg-obsidian overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-baltic/25 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-aqua/10 blur-[100px]" />
        </div>
        <Container className="relative z-10 text-center">
          <FadeIn>
            <p className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
              {lang === "fr" ? "Une question ou un besoin spécifique ?" : "A question or specific need?"}
            </p>
            <p className="font-body text-white/45 mb-8 max-w-md mx-auto">
              {lang === "fr"
                ? "Notre équipe est disponible pour vous orienter vers le service le mieux adapté."
                : "Our team is available to guide you to the most suitable service."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="relative overflow-hidden group inline-flex items-center gap-2 px-8 py-4 bg-white text-obsidian font-body font-semibold rounded-btn shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber" />
              <span className="relative group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                {lang === "fr" ? "Nous contacter" : "Contact us"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-200" />
              </span>
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
