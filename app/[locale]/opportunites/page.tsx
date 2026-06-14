import type { Metadata } from "next";
import Link from "next/link";

import { Briefcase, GraduationCap, Mail } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GlassCard, SectionBlobs } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as "fr" | "en";
  return {
    title: lang === "fr" ? "Opportunités & Formation — Total Klean" : "Opportunities & Training — Total Klean",
    description: lang === "fr"
      ? "Rejoignez une équipe passionnée par l'excellence automobile à Goma."
      : "Join a team passionate about automotive excellence in Goma.",
  };
}

export default async function OpportunitesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow={lang === "fr" ? "Rejoignez-nous" : "Join us"}
        heading={lang === "fr" ? "Opportunités & Formation" : "Opportunities & Training"}
        subtext={lang === "fr"
          ? "Rejoignez une équipe passionnée par l'excellence automobile à Goma."
          : "Join a team passionate about automotive excellence in Goma."}
      />

      <section className="relative py-28 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="warm" />
        <Container className="relative z-10 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <GlassCard delay={0} className="p-8">
              <div className="w-12 h-12 bg-baltic/10 rounded-xl flex items-center justify-center mb-6">
                <Briefcase size={22} className="text-baltic" />
              </div>
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-3">
                {lang === "fr" ? "Opportunités d'emploi" : "Job opportunities"}
              </h2>
              <p className="font-body text-sm text-obsidian/60 leading-relaxed mb-6">
                {lang === "fr"
                  ? "Nous recherchons des personnes passionnées, rigoureuses et engagées qui souhaitent contribuer à l'excellence de Total Klean."
                  : "We're looking for passionate, rigorous and committed people who want to contribute to Total Klean's excellence."}
              </p>
              <div className="bg-amber/8 border border-amber/20 rounded-xl px-4 py-3 text-center">
                <p className="font-body text-xs text-amber font-semibold">
                  {lang === "fr" ? "Postes disponibles à venir" : "Available positions coming soon"}
                </p>
              </div>
            </GlassCard>

            <GlassCard delay={0.1} className="p-8">
              <div className="w-12 h-12 bg-aqua/10 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap size={22} className="text-aqua" />
              </div>
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-3">
                {lang === "fr" ? "Programme de formation" : "Training programme"}
              </h2>
              <p className="font-body text-sm text-obsidian/60 leading-relaxed mb-6">
                {lang === "fr"
                  ? "Total Klean propose des formations aux techniques professionnelles de préparation esthétique automobile pour développer les compétences locales."
                  : "Total Klean offers training in professional automotive detailing techniques to develop local skills."}
              </p>
              <div className="bg-amber/8 border border-amber/20 rounded-xl px-4 py-3 text-center">
                <p className="font-body text-xs text-amber font-semibold">
                  {lang === "fr" ? "Détails du programme à venir" : "Programme details coming soon"}
                </p>
              </div>
            </GlassCard>
          </div>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden bg-obsidian">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-baltic/30 blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-64 h-48 rounded-full bg-aqua/15 blur-[70px]" />
              </div>
              <div className="relative z-10 p-10 text-center text-white">
                <h3 className="font-heading font-bold text-2xl mb-3">
                  {lang === "fr" ? "Candidature spontanée" : "Open application"}
                </h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-7 max-w-lg mx-auto">
                  {lang === "fr"
                    ? "Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée — nous gardons tous les profils intéressants en mémoire."
                    : "Can't find a matching position? Send us an open application — we keep all interesting profiles on file."}
                </p>
                <a
                  href="mailto:contact@totalklean.com?subject=Candidature spontanée — Total Klean"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors shadow-lg"
                >
                  <Mail size={15} />
                  contact@totalklean.com
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GlassCard hover={false} className="mt-6 p-6 text-center">
              <p className="font-body text-sm text-obsidian/50">
                {lang === "fr"
                  ? "Les offres d'emploi et les sessions de formation seront publiées ici dès leur disponibilité."
                  : "Job offers and training sessions will be published here as soon as they are available."}
                {" "}
                <Link href={`/${locale}/contact`} className="text-baltic hover:text-amber transition-colors font-medium">
                  {lang === "fr" ? "Contactez-nous" : "Contact us"}
                </Link>
                {lang === "fr" ? " pour plus d'informations." : " for more information."}
              </p>
            </GlassCard>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
