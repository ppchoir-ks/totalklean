import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Briefcase, GraduationCap, Mail } from "lucide-react";

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

      <section className="py-24 bg-white">
        <Container className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#f8f9fc] rounded-card p-8">
              <div className="w-12 h-12 bg-baltic/10 rounded-xl flex items-center justify-center mb-5">
                <Briefcase size={22} className="text-baltic" />
              </div>
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-3">
                {lang === "fr" ? "Opportunités d'emploi" : "Job opportunities"}
              </h2>
              <p className="font-body text-sm text-obsidian/60 leading-relaxed mb-5">
                {lang === "fr"
                  ? "Nous recherchons des personnes passionnées, rigoureuses et engagées qui souhaitent contribuer à l'excellence de Total Klean."
                  : "We're looking for passionate, rigorous and committed people who want to contribute to Total Klean's excellence."}
              </p>
              <div className="bg-amber/10 border border-amber/20 rounded-btn px-4 py-3 text-center">
                <p className="font-body text-xs text-amber font-semibold">
                  {lang === "fr" ? "[CONTENU À COMPLÉTER] — Postes disponibles à venir" : "[CONTENT TO BE ADDED] — Available positions coming soon"}
                </p>
              </div>
            </div>

            <div className="bg-[#f8f9fc] rounded-card p-8">
              <div className="w-12 h-12 bg-aqua/10 rounded-xl flex items-center justify-center mb-5">
                <GraduationCap size={22} className="text-aqua" />
              </div>
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-3">
                {lang === "fr" ? "Programme de formation" : "Training programme"}
              </h2>
              <p className="font-body text-sm text-obsidian/60 leading-relaxed mb-5">
                {lang === "fr"
                  ? "Total Klean propose des formations aux techniques professionnelles de préparation esthétique automobile pour développer les compétences locales."
                  : "Total Klean offers training in professional automotive detailing techniques to develop local skills."}
              </p>
              <div className="bg-amber/10 border border-amber/20 rounded-btn px-4 py-3 text-center">
                <p className="font-body text-xs text-amber font-semibold">
                  {lang === "fr" ? "[CONTENU À COMPLÉTER] — Détails du programme à venir" : "[CONTENT TO BE ADDED] — Programme details coming soon"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-baltic rounded-card p-10 text-center text-white">
            <h3 className="font-heading font-bold text-2xl mb-3">
              {lang === "fr" ? "Candidature spontanée" : "Open application"}
            </h3>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
              {lang === "fr"
                ? "Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée — nous gardons tous les profils intéressants en mémoire."
                : "Can't find a matching position? Send us an open application — we keep all interesting profiles on file."}
            </p>
            <a
              href="mailto:contact@totalklean.com?subject=Candidature spontanée — Total Klean"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors"
            >
              <Mail size={15} />
              contact@totalklean.com
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
