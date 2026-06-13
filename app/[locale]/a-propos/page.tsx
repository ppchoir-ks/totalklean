import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MapPin, Phone, Mail, Award, Users, Leaf } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = {
  fr: [
    { icon: Award, title: "Excellence", desc: "Nous ne faisons aucun compromis sur la qualité de nos services et les produits que nous utilisons." },
    { icon: Users, title: "Soin", desc: "Chaque véhicule est traité avec la même attention et le même respect que si c'était le nôtre." },
    { icon: Leaf, title: "Adaptabilité", desc: "Nos services s'adaptent à votre emploi du temps, votre budget et les besoins spécifiques de votre véhicule." },
    { icon: Award, title: "Fiabilité", desc: "Nos clients nous font confiance pour des résultats constants et un service ponctuel à chaque fois." },
  ],
  en: [
    { icon: Award, title: "Excellence", desc: "We make no compromises on the quality of our services and the products we use." },
    { icon: Users, title: "Care", desc: "Every vehicle is treated with the same attention and respect as if it were our own." },
    { icon: Leaf, title: "Adaptability", desc: "Our services adapt to your schedule, budget, and the specific needs of your vehicle." },
    { icon: Award, title: "Reliability", desc: "Our clients trust us for consistent results and punctual service every time." },
  ],
};

const teamManagement = {
  fr: [
    { name: "Direction Générale", role: "Management", initials: "DG", color: "bg-baltic" },
    { name: "Direction Technique", role: "Opérations", initials: "DT", color: "bg-aqua" },
  ],
  en: [
    { name: "General Management", role: "Management", initials: "GM", color: "bg-baltic" },
    { name: "Technical Direction", role: "Operations", initials: "TD", color: "bg-aqua" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "a-propos");
}

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("nav");
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
      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow={lang === "fr" ? "Notre histoire" : "Our story"}
                heading={lang === "fr" ? "Nés de la passion pour l'automobile" : "Born from a passion for cars"}
                align="left"
                className="mb-8"
              />
              <div className="space-y-4 font-body text-obsidian/65 leading-relaxed">
                {lang === "fr" ? (
                  <>
                    <p>Total Klean est né d'une vision simple mais ambitieuse : offrir aux automobilistes de Goma et de la région un service de préparation esthétique à la hauteur des standards internationaux.</p>
                    <p>Fondée par des passionnés de l'automobile, notre entreprise s'est rapidement imposée comme la référence locale en matière de lavage professionnel, de polissage et de protection céramique.</p>
                    <p>Notre mission est claire : assurer un lavage et une préparation esthétique de haute qualité pour les véhicules de nos clients tout en respectant les normes et les procédures qui garantissent des résultats irréprochables.</p>
                  </>
                ) : (
                  <>
                    <p>Total Klean was born from a simple yet ambitious vision: to offer motorists in Goma and the surrounding region an automotive detailing service that matches international standards.</p>
                    <p>Founded by car enthusiasts, our company has quickly established itself as the local reference for professional washing, polishing and ceramic protection.</p>
                    <p>Our mission is clear: to provide high-quality washing and aesthetic preparation for our clients' vehicles while adhering to the standards and procedures that guarantee flawless results.</p>
                  </>
                )}
              </div>
            </div>
            <div className="relative h-80 lg:h-[440px] rounded-card overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80"
                alt="Total Klean — Atelier de préparation esthétique"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
                <p className="font-heading font-bold text-baltic text-sm">Goma, RDC</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-aqua" />
                  <p className="font-body text-obsidian/50 text-xs">N°16, Rue Rachidi Tumbula</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section id="valeurs" className="py-24 bg-[#f8f9fc]">
        <Container>
          <SectionHeading
            eyebrow={lang === "fr" ? "Ce qui nous définit" : "What defines us"}
            heading={lang === "fr" ? "Nos valeurs" : "Our values"}
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values[lang].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="bg-white rounded-card p-7 border border-black/5 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-baltic/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-baltic" />
                </div>
                <h3 className="font-heading font-semibold text-obsidian text-lg mb-2">{title}</h3>
                <p className="font-body text-sm text-obsidian/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section id="equipe" className="py-24 bg-white">
        <Container>
          <SectionHeading
            eyebrow={lang === "fr" ? "L'équipe" : "The team"}
            heading={lang === "fr" ? "Des professionnels à votre service" : "Professionals at your service"}
            subtext={lang === "fr"
              ? "Notre équipe est formée aux meilleures techniques de préparation esthétique automobile."
              : "Our team is trained in the best automotive detailing techniques."}
            className="mb-14"
          />

          <div className="mb-10">
            <h3 className="font-heading font-semibold text-obsidian/40 text-xs uppercase tracking-wider mb-6">
              {lang === "fr" ? "Équipe de gestion" : "Management team"}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamManagement[lang].map((member) => (
                <div key={member.name} className="bg-[#f8f9fc] rounded-card p-6 flex items-center gap-4">
                  <div className={`${member.color} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="font-heading font-bold text-white">{member.initials}</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-obsidian">{member.name}</p>
                    <p className="font-body text-xs text-obsidian/50 mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-baltic/5 border border-baltic/10 rounded-card p-6 text-center">
            <p className="font-body text-obsidian/50 text-sm">
              {lang === "fr"
                ? "[PHOTO & NOMS À AJOUTER] — Les photos et noms complets des membres de l'équipe seront ajoutés une fois fournis."
                : "[PHOTOS & NAMES TO BE ADDED] — Team member photos and full names will be added once provided."}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact strip */}
      <section className="py-16 bg-baltic">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-heading font-bold text-white text-2xl md:text-3xl">
                {lang === "fr" ? "Venez nous rendre visite" : "Come visit us"}
              </p>
              <p className="font-body text-white/65 mt-2">Goma, RDC</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+243997806193" className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 text-white font-body text-sm font-medium rounded-btn hover:bg-white/20 transition-colors">
                <Phone size={15} /> +243 997 806 193
              </a>
              <a href="mailto:contact@totalklean.com" className="flex items-center gap-2 px-5 py-3 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors">
                <Mail size={15} /> contact@totalklean.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
