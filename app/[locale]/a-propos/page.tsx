import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Image from "next/image";

import { MapPin, Phone, Mail, Award, Users, Leaf, Shield } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard, SectionBlobs } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { TeamCarousel } from "@/components/sections/TeamCarousel";
import type { TeamMember } from "@/components/sections/TeamCarousel";

const values = {
  fr: [
    { icon: Award, title: "Excellence", desc: "Nous ne faisons aucun compromis sur la qualité de nos services et les produits que nous utilisons.", color: "bg-baltic/10 text-baltic" },
    { icon: Users, title: "Soin", desc: "Chaque véhicule est traité avec la même attention et le même respect que si c'était le nôtre.", color: "bg-aqua/10 text-aqua" },
    { icon: Leaf, title: "Adaptabilité", desc: "Nos services s'adaptent à votre emploi du temps, votre budget et les besoins spécifiques de votre véhicule.", color: "bg-amber/10 text-amber" },
    { icon: Shield, title: "Fiabilité", desc: "Nos clients nous font confiance pour des résultats constants et un service ponctuel à chaque fois.", color: "bg-baltic/10 text-baltic" },
  ],
  en: [
    { icon: Award, title: "Excellence", desc: "We make no compromises on the quality of our services and the products we use.", color: "bg-baltic/10 text-baltic" },
    { icon: Users, title: "Care", desc: "Every vehicle is treated with the same attention and respect as if it were our own.", color: "bg-aqua/10 text-aqua" },
    { icon: Leaf, title: "Adaptability", desc: "Our services adapt to your schedule, budget, and the specific needs of your vehicle.", color: "bg-amber/10 text-amber" },
    { icon: Shield, title: "Reliability", desc: "Our clients trust us for consistent results and punctual service every time.", color: "bg-baltic/10 text-baltic" },
  ],
};

// ─── Team data ────────────────────────────────────────────────────────────────
// Replace name / image fields once real info & photos are available.
// To add a photo: set  image: "/assets/team/filename.jpg"

const management: TeamMember[] = [
  {
    id: "dg",
    name: "Prénom Nom",
    role: { fr: "Directeur Général", en: "General Manager" },
    experience: { fr: "5 ans d'expérience", en: "5 years of experience" },
    initials: "DG",
    colorFrom: "#285889",
    colorTo: "#47A4C3",
  },
  {
    id: "dt",
    name: "Prénom Nom",
    role: { fr: "Directeur Technique", en: "Technical Director" },
    experience: { fr: "4 ans d'expérience", en: "4 years of experience" },
    initials: "DT",
    colorFrom: "#47A4C3",
    colorTo: "#1a4f7a",
  },
  {
    id: "rc",
    name: "Prénom Nom",
    role: { fr: "Responsable Commercial", en: "Sales Manager" },
    experience: { fr: "3 ans d'expérience", en: "3 years of experience" },
    initials: "RC",
    colorFrom: "#EF762F",
    colorTo: "#c45a18",
  },
  {
    id: "ra",
    name: "Prénom Nom",
    role: { fr: "Responsable Administrative", en: "Administrative Manager" },
    experience: { fr: "3 ans d'expérience", en: "3 years of experience" },
    initials: "RA",
    colorFrom: "#1a4f7a",
    colorTo: "#285889",
  },
];

const cleaners: TeamMember[] = [
  {
    id: "c1",
    name: "Prénom Nom",
    role: { fr: "Chef Technicien", en: "Lead Technician" },
    experience: { fr: "4 ans d'expérience", en: "4 years of experience" },
    initials: "CT",
    colorFrom: "#285889",
    colorTo: "#47A4C3",
  },
  {
    id: "c2",
    name: "Prénom Nom",
    role: { fr: "Spécialiste Céramique", en: "Ceramic Specialist" },
    experience: { fr: "3 ans d'expérience", en: "3 years of experience" },
    initials: "SC",
    colorFrom: "#47A4C3",
    colorTo: "#285889",
  },
  {
    id: "c3",
    name: "Prénom Nom",
    role: { fr: "Technicien Polissage", en: "Polishing Technician" },
    experience: { fr: "3 ans d'expérience", en: "3 years of experience" },
    initials: "TP",
    colorFrom: "#EF762F",
    colorTo: "#285889",
  },
  {
    id: "c4",
    name: "Prénom Nom",
    role: { fr: "Technicien Lavage", en: "Wash Technician" },
    experience: { fr: "2 ans d'expérience", en: "2 years of experience" },
    initials: "TL",
    colorFrom: "#1a4f7a",
    colorTo: "#47A4C3",
  },
  {
    id: "c5",
    name: "Prénom Nom",
    role: { fr: "Technicien Lavage", en: "Wash Technician" },
    experience: { fr: "2 ans d'expérience", en: "2 years of experience" },
    initials: "TL",
    colorFrom: "#285889",
    colorTo: "#EF762F",
  },
  {
    id: "c6",
    name: "Prénom Nom",
    role: { fr: "Spécialiste Phares", en: "Headlight Specialist" },
    experience: { fr: "3 ans d'expérience", en: "3 years of experience" },
    initials: "SP",
    colorFrom: "#47A4C3",
    colorTo: "#EF762F",
  },
  {
    id: "c7",
    name: "Prénom Nom",
    role: { fr: "Technicien Moteur", en: "Engine Technician" },
    experience: { fr: "2 ans d'expérience", en: "2 years of experience" },
    initials: "TM",
    colorFrom: "#EF762F",
    colorTo: "#1a4f7a",
  },
  {
    id: "c8",
    name: "Prénom Nom",
    role: { fr: "Technicien Mobile", en: "Mobile Technician" },
    experience: { fr: "2 ans d'expérience", en: "2 years of experience" },
    initials: "TM",
    colorFrom: "#1a4f7a",
    colorTo: "#285889",
  },
  {
    id: "c9",
    name: "Prénom Nom",
    role: { fr: "Technicien Polyvalent", en: "Multi-skilled Technician" },
    experience: { fr: "1 an d'expérience", en: "1 year of experience" },
    initials: "TP",
    colorFrom: "#285889",
    colorTo: "#47A4C3",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "a-propos");
}

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow="Total Klean"
        heading={lang === "fr" ? "Qui sommes-nous ?" : "Who are we?"}
        subtext={lang === "fr"
          ? "Une entreprise de préparation esthétique automobile basée à Goma, engagée envers l'excellence depuis le premier jour."
          : "An automotive detailing company based in Goma, committed to excellence from day one."}
      />

      {/* Story / Mission */}
      <section className="relative py-16 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="cool" />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <SectionHeading
                eyebrow={lang === "fr" ? "Notre histoire" : "Our story"}
                heading={lang === "fr" ? "Nés de la passion pour l'automobile" : "Born from a passion for cars"}
                align="left"
                className="mb-8"
              />
              <div className="space-y-4 font-body text-obsidian/60 leading-relaxed">
                {lang === "fr" ? (
                  <>
                    <p>Total Klean est né d&apos;une vision simple mais ambitieuse : offrir aux automobilistes de Goma et de la région un service de préparation esthétique à la hauteur des standards internationaux.</p>
                    <p>Fondée par des passionnés de l&apos;automobile, notre entreprise s&apos;est rapidement imposée comme la référence locale en matière de lavage professionnel, de polissage et de protection céramique.</p>
                    <p>Notre mission est claire : assurer un lavage et une préparation esthétique de haute qualité pour les véhicules de nos clients tout en respectant les normes et les procédures qui garantissent des résultats irréprochables.</p>
                  </>
                ) : (
                  <>
                    <p>Total Klean was born from a simple yet ambitious vision: to offer motorists in Goma and the surrounding region an automotive detailing service that matches international standards.</p>
                    <p>Founded by car enthusiasts, our company has quickly established itself as the local reference for professional washing, polishing and ceramic protection.</p>
                    <p>Our mission is clear: to provide high-quality washing and aesthetic preparation for our clients&apos; vehicles while adhering to the standards and procedures that guarantee flawless results.</p>
                  </>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.12} className="relative h-80 lg:h-[460px]">
              <GlassCard hover={false} className="absolute inset-0 p-2 overflow-hidden">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80"
                    alt="Total Klean — Atelier"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </GlassCard>
              <FadeIn
                delay={0.35}
                className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-xl border border-white/60 rounded-xl px-4 py-3 shadow-lg"
              >
                <p className="font-heading font-bold text-baltic text-sm">Goma, RDC</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-aqua" />
                  <p className="font-body text-obsidian/50 text-xs">N°16, Rue Rachidi Tumbula</p>
                </div>
              </FadeIn>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section id="valeurs" className="relative py-16 bg-white overflow-hidden">
        <SectionBlobs variant="default" />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow={lang === "fr" ? "Ce qui nous définit" : "What defines us"}
            heading={lang === "fr" ? "Nos valeurs" : "Our values"}
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values[lang].map(({ icon: Icon, title, desc, color }, i) => (
              <GlassCard key={title} delay={i * 0.1} className="p-7">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-obsidian text-lg mb-2">{title}</h3>
                <p className="font-body text-sm text-obsidian/55 leading-relaxed">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Management team */}
      <section id="equipe" className="pt-16 pb-10 bg-[#f8f9fc] overflow-hidden">
        <Container className="mb-8">
          <FadeIn>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-aqua mb-2">
              {lang === "fr" ? "L'équipe" : "The team"}
            </p>
            <SectionHeading
              heading={lang === "fr" ? "L'équipe de direction" : "Management team"}
              subtext={lang === "fr"
                ? "Ceux qui pilotent la vision et les opérations de Total Klean."
                : "The people driving Total Klean's vision and operations."}
              align="left"
              className="max-w-xl"
            />
          </FadeIn>
        </Container>
        <TeamCarousel members={management} lang={lang} bg="#f8f9fc" />
      </section>

      {/* Cleaners team */}
      <section className="pt-10 pb-16 bg-white overflow-hidden">
        <Container className="mb-8">
          <FadeIn>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-aqua mb-2">
              {lang === "fr" ? "Les techniciens" : "The technicians"}
            </p>
            <SectionHeading
              heading={lang === "fr" ? "The Cleaners" : "The Cleaners"}
              subtext={lang === "fr"
                ? "Nos techniciens certifiés — les artisans du résultat impeccable que vous méritez."
                : "Our certified technicians — the craftsmen behind the flawless result you deserve."}
              align="left"
              className="max-w-xl"
            />
          </FadeIn>
        </Container>
        <TeamCarousel members={cleaners} lang={lang} bg="white" />

      </section>

      {/* Contact strip */}
      <section className="relative py-14 bg-obsidian overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[300px] rounded-full bg-baltic/25 blur-[120px] -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[250px] rounded-full bg-aqua/10 blur-[100px] translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <FadeIn>
              <p className="font-heading font-bold text-white text-2xl md:text-3xl">
                {lang === "fr" ? "Venez nous rendre visite" : "Come visit us"}
              </p>
              <p className="font-body text-white/50 mt-2">Goma, RDC</p>
            </FadeIn>
            <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+243997806193"
                className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/15 text-white font-body text-sm font-medium rounded-btn hover:bg-white/20 transition-colors"
              >
                <Phone size={15} /> +243 997 806 193
              </a>
              <a
                href="mailto:contact@totalklean.com"
                className="flex items-center gap-2 px-5 py-3 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors"
              >
                <Mail size={15} /> contact@totalklean.com
              </a>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
