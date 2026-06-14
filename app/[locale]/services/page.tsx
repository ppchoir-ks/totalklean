import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBlobs } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";

const services = [
  {
    id: "lavage",
    image: "/assets/services/lavage.jpg",
    accentFrom: "#285889",
    accentTo: "#47A4C3",
    fr: {
      title: "Lavage basique et complet",
      desc: "Un nettoyage en profondeur de l'intérieur et de l'extérieur de votre véhicule. Nous prenons soin de chaque détail pour vous rendre un habitacle impeccable et une carrosserie brillante.",
      points: ["Nettoyage extérieur haute pression", "Aspiration intérieure complète", "Nettoyage des vitres", "Dépoussiérage du tableau de bord", "Traitement des jantes"],
    },
    en: {
      title: "Basic & Full Wash",
      desc: "A thorough interior and exterior cleaning of your vehicle. We take care of every detail to return a spotless interior and gleaming bodywork.",
      points: ["High-pressure exterior wash", "Complete interior vacuuming", "Window cleaning", "Dashboard dusting", "Wheel treatment"],
    },
  },
  {
    id: "correction-peinture",
    image: "/assets/services/polissage.jpg",
    accentFrom: "#47A4C3",
    accentTo: "#1a4f7a",
    fr: {
      title: "Correction de la peinture",
      desc: "Le polissage professionnel élimine les rayures légères, les marques de tourbillon et l'oxydation pour révéler l'éclat original de votre carrosserie.",
      points: ["Élimination des rayures légères", "Correction des marques de tourbillon", "Traitement de l'oxydation", "Polissage machine professionnel", "Résultat longue durée"],
    },
    en: {
      title: "Paint Correction",
      desc: "Professional polishing removes light scratches, swirl marks and oxidation to reveal the original shine of your bodywork.",
      points: ["Light scratch removal", "Swirl mark correction", "Oxidation treatment", "Professional machine polishing", "Long-lasting results"],
    },
  },
  {
    id: "ceramique",
    image: "/assets/services/ceramic.jpg",
    accentFrom: "#1a4f7a",
    accentTo: "#285889",
    fr: {
      title: "Protection céramique",
      desc: "Le revêtement céramique crée une barrière protectrice hydrophobe sur votre carrosserie, repoussant l'eau, la saleté et les UV pour une protection longue durée et un éclat exceptionnel.",
      points: ["Protection hydrophobe durable", "Résistance aux UV et aux rayures légères", "Facilite l'entretien quotidien", "Éclat et profondeur de couleur amplifiés", "Garantie multi-annuelle"],
    },
    en: {
      title: "Ceramic Protection",
      desc: "Ceramic coating creates a hydrophobic protective barrier on your bodywork, repelling water, dirt and UV for long-lasting protection and exceptional shine.",
      points: ["Durable hydrophobic protection", "UV and light scratch resistance", "Simplifies daily maintenance", "Amplified shine and colour depth", "Multi-year warranty"],
    },
  },
  {
    id: "phares",
    image: "/assets/services/phares.jpg",
    accentFrom: "#285889",
    accentTo: "#47A4C3",
    fr: {
      title: "Rénovation des phares",
      desc: "Des phares ternes ou jaunis compromettent à la fois l'esthétique de votre véhicule et votre sécurité. Notre traitement restaure leur clarté et leur luminosité d'origine.",
      points: ["Polissage des optiques ternis", "Traitement anti-jaunissement", "Application d'un vernis protecteur", "Amélioration de la visibilité nocturne", "Résultat durable"],
    },
    en: {
      title: "Headlight Restoration",
      desc: "Cloudy or yellowed headlights compromise both your vehicle's appearance and your safety. Our treatment restores their original clarity and brightness.",
      points: ["Cloudy lens polishing", "Anti-yellowing treatment", "Protective lacquer application", "Improved night visibility", "Long-lasting result"],
    },
  },
  {
    id: "moteur",
    image: "/assets/services/moteur.jpg",
    accentFrom: "#47A4C3",
    accentTo: "#285889",
    fr: {
      title: "Nettoyage moteur",
      desc: "Un compartiment moteur propre facilite la détection des fuites, améliore la dissipation thermique et témoigne du soin apporté à l'entretien global du véhicule.",
      points: ["Dégraissage en profondeur", "Nettoyage de tous les composants accessibles", "Protection des éléments électriques", "Rinçage et séchage soigneux", "Finition et habillage des plastiques"],
    },
    en: {
      title: "Engine Cleaning",
      desc: "A clean engine bay makes it easier to detect leaks, improves heat dissipation and shows the care given to the vehicle's overall maintenance.",
      points: ["Deep degreasing", "Cleaning of all accessible components", "Electrical component protection", "Careful rinsing and drying", "Plastic trim finishing"],
    },
  },
  {
    id: "mobile",
    image: "/assets/services/mobile.jpg",
    featured: true,
    accentFrom: "#EF762F",
    accentTo: "#c45a18",
    fr: {
      title: "Total Klean Mobile",
      desc: "Notre service phare : nous venons directement à vous, que vous soyez à domicile, au bureau ou n'importe où dans Goma. Tous nos services sont disponibles en version mobile avec le même niveau de qualité.",
      points: ["Déplacement à domicile ou au bureau", "Tous les services disponibles en mobile", "Équipements professionnels transportés sur place", "Disponible partout dans Goma et environs", "Sur rendez-vous, à votre convenance"],
    },
    en: {
      title: "Total Klean Mobile",
      desc: "Our flagship service: we come directly to you, whether at home, at the office or anywhere in Goma. All our services are available in mobile form with the same level of quality.",
      points: ["Home or office visits", "All services available mobile", "Professional equipment transported on-site", "Available anywhere in Goma and surroundings", "By appointment, at your convenience"],
    },
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "services");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";
  const total = services.length;

  return (
    <>
      <PageHero
        eyebrow="Total Klean"
        heading={lang === "fr" ? "Nos services" : "Our services"}
        subtext={lang === "fr"
          ? "Une gamme complète de services pour restaurer, protéger et entretenir votre véhicule."
          : "A complete range of services to restore, protect and maintain your vehicle."}
      />

      <section className="relative py-16 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="default" />
        <Container className="relative z-10">
          <div className="space-y-16">
            {services.map((svc, i) => {
              const isReversed = i % 2 === 1;
              const num = String(i + 1).padStart(2, "0");
              const isFeatured = !!svc.featured;

              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className={`grid lg:grid-cols-2 gap-8 items-stretch ${isReversed ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* ── IMAGE CARD ──────────────────────────────────── */}
                  <FadeIn
                    x={isReversed ? 40 : -40}
                    y={0}
                    className={isReversed ? "lg:col-start-2" : ""}
                  >
                    <div className="relative h-[300px] lg:h-[380px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.16)] group">

                      {/* Photo */}
                      <Image
                        src={svc.image}
                        alt={svc[lang].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      {/* Soft vignette - heavier at bottom, fades to transparent at top */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                      {/* Top row - number + optional featured badge */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                        <span className="bg-white/15 backdrop-blur-md border border-white/25 text-white/80 font-body text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest">
                          {num} / {String(total).padStart(2, "0")}
                        </span>
                        {isFeatured && (
                          <span className="flex items-center gap-1.5 bg-amber/90 backdrop-blur-md text-white font-body text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                            <Sparkles size={11} />
                            {lang === "fr" ? "Service phare" : "Flagship"}
                          </span>
                        )}
                      </div>

                      {/* Bottom - watermark number */}
                      <div className="absolute bottom-4 left-6 z-10">
                        <span className="font-heading font-black text-white/40 text-8xl leading-none select-none">
                          {num}
                        </span>
                      </div>

                      {/* Decorative color bleed from accent */}
                      <div
                        className="absolute inset-0 opacity-20 mix-blend-color-dodge"
                        style={{
                          background: `radial-gradient(ellipse at 80% 0%, ${svc.accentFrom}88 0%, transparent 60%)`,
                        }}
                      />
                    </div>
                  </FadeIn>

                  {/* ── GLASS DESCRIPTION CARD ──────────────────────── */}
                  <FadeIn
                    x={isReversed ? -40 : 40}
                    y={0}
                    delay={0.12}
                    className={`flex flex-col ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  >
                    <div className="flex flex-col flex-1 bg-white/80 backdrop-blur-xl border border-white/65 shadow-[0_8px_48px_rgba(40,88,137,0.1)] rounded-3xl p-8 lg:p-10 relative overflow-hidden">

                      {/* Subtle gradient accent in top-right corner */}
                      <div
                        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-[0.07] blur-2xl pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${svc.accentFrom}, ${svc.accentTo})` }}
                      />

                      {/* Number eyebrow */}
                      <p
                        className="font-body text-xs font-bold uppercase tracking-[0.22em] mb-3"
                        style={{ color: isFeatured ? "#EF762F" : "#47A4C3" }}
                      >
                        {num}
                      </p>

                      {/* Title */}
                      <h2 className="font-heading font-bold text-obsidian text-3xl md:text-4xl mb-4 leading-tight">
                        {svc[lang].title}
                      </h2>

                      {/* Divider */}
                      <div
                        className="w-12 h-0.5 rounded-full mb-6"
                        style={{ background: `linear-gradient(to right, ${svc.accentFrom}, ${svc.accentTo})` }}
                      />

                      {/* Description */}
                      <p className="font-body text-obsidian/60 leading-relaxed mb-7">
                        {svc[lang].desc}
                      </p>

                      {/* Feature points */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {svc[lang].points.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: `linear-gradient(135deg, ${svc.accentFrom}22, ${svc.accentTo}22)` }}
                            >
                              <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
                                <path d="M2 6l2.5 2.5L10 3.5" stroke={svc.accentFrom} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span className="font-body text-sm text-obsidian/65 leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA - at bottom of the card */}
                      <div className="flex items-center gap-3 flex-wrap mt-auto pt-2">
                        <Link
                          href={isFeatured
                            ? `https://wa.me/243997806193?text=${encodeURIComponent(lang === "fr" ? "Bonjour Total Klean, je souhaite réserver le service Mobile." : "Hello Total Klean, I'd like to book the Mobile service.")}`
                            : `/${locale}/cotation`}
                          {...(isFeatured ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 text-white font-body font-semibold rounded-btn transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                          style={{
                            background: isFeatured
                              ? "linear-gradient(135deg, #EF762F, #c45a18)"
                              : "linear-gradient(135deg, #285889, #47A4C3)",
                          }}
                        >
                          {/* Hover: blue → orange, orange → deep blue */}
                          <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: isFeatured
                                ? "linear-gradient(135deg, #285889, #1a4f7a)"
                                : "linear-gradient(135deg, #EF762F, #c45a18)",
                            }}
                          />
                          <span className="relative flex items-center gap-2">
                            {isFeatured
                              ? <><MessageCircle size={15} />{lang === "fr" ? "Réserver via WhatsApp" : "Book via WhatsApp"}</>
                              : <>{lang === "fr" ? "Demander une cotation" : "Request a quote"}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></>
                            }
                          </span>
                        </Link>
                        {!isFeatured && (
                          <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-obsidian/45 hover:text-baltic transition-colors"
                          >
                            {lang === "fr" ? "Ou nous contacter" : "Or contact us"}
                            <ArrowRight size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA - merged */}
      <section className="relative py-16 bg-obsidian overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-baltic/25 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-aqua/10 blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.015] to-transparent" />
        </div>
        <Container className="relative z-10 text-center">
          <FadeIn>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-aqua mb-4">
              Total Klean
            </p>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4 max-w-2xl mx-auto leading-tight">
              {lang === "fr"
                ? "Prêt à redonner de l'éclat à votre véhicule ?"
                : "Ready to restore your vehicle's brilliance?"}
            </h2>
            <p className="font-body text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
              {lang === "fr"
                ? "Consultez nos tarifs et réservez directement, ou contactez notre équipe pour un conseil personnalisé."
                : "Browse our pricing and book directly, or reach out to our team for personalised advice."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Orange → deep blue on hover */}
              <Link
                href={`/${locale}/cotation`}
                className="relative overflow-hidden group inline-flex items-center gap-2 px-8 py-4 bg-amber text-white font-body font-semibold rounded-btn shadow-[0_4px_20px_rgba(239,118,47,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(40,88,137,0.4)]"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #285889, #1a4f7a)" }}
                />
                <span className="relative">{lang === "fr" ? "Voir les tarifs" : "See pricing"}</span>
              </Link>
              {/* Outline → orange on hover */}
              <Link
                href={`/${locale}/contact`}
                className="relative overflow-hidden group inline-flex items-center gap-2 px-8 py-4 border border-white/20 font-body font-semibold rounded-btn transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_8px_28px_rgba(255,255,255,0.15)]"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white" />
                <span className="relative text-white/80 group-hover:text-obsidian transition-colors duration-300">{lang === "fr" ? "Nous contacter" : "Contact us"}</span>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
