import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionBlobs } from "@/components/ui/GlassCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as "fr" | "en";
  return {
    title: lang === "fr" ? "Politique de confidentialité — Total Klean" : "Privacy Policy — Total Klean",
    robots: "noindex",
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
      />

      <section className="relative py-28 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="cool" />
        <Container className="relative z-10 max-w-3xl">
          <FadeIn>
            <div className="bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_8px_40px_rgba(40,88,137,0.08)] rounded-2xl p-10">
              <div className="bg-amber/8 border border-amber/20 rounded-xl p-5 mb-10">
                <p className="font-body text-sm text-amber font-semibold">
                  {lang === "fr"
                    ? "La politique de confidentialité complète sera rédigée et ajoutée ici. Voici les éléments clés."
                    : "The full privacy policy will be drafted and added here. Here are the key elements."}
                </p>
              </div>

              <div className="space-y-8 font-body text-obsidian/65 leading-relaxed">
                {lang === "fr" ? (
                  <>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Collecte des données</h2>
                      <p>Total Klean collecte uniquement les données que vous nous fournissez volontairement via nos formulaires de contact et de cotation (nom, e-mail, téléphone, informations sur votre véhicule).</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Utilisation des données</h2>
                      <p>Vos données sont utilisées exclusivement pour répondre à vos demandes, vous envoyer des cotations et, avec votre consentement, vous informer de nos offres et actualités.</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Conservation</h2>
                      <p>Vos données sont conservées pendant la durée nécessaire à la prestation du service et au maximum 3 ans après votre dernier contact avec Total Klean.</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Vos droits</h2>
                      <p>Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour toute demande, contactez-nous à <a href="mailto:contact@totalklean.com" className="text-baltic hover:text-amber transition-colors">contact@totalklean.com</a>.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Data collection</h2>
                      <p>Total Klean only collects data you voluntarily provide via our contact and quote forms (name, email, phone, vehicle information).</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Data use</h2>
                      <p>Your data is used exclusively to respond to your requests, send you quotes and, with your consent, inform you of our offers and news.</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Retention</h2>
                      <p>Your data is kept for as long as necessary to provide the service and for a maximum of 3 years after your last contact with Total Klean.</p>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-obsidian text-lg mb-3">Your rights</h2>
                      <p>You have the right to access, rectify and delete your data. For any request, contact us at <a href="mailto:contact@totalklean.com" className="text-baltic hover:text-amber transition-colors">contact@totalklean.com</a>.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
