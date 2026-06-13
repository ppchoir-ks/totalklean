import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
        bg="baltic"
      />
      <section className="py-20 bg-white">
        <Container className="max-w-3xl">
          <div className="prose prose-sm font-body text-obsidian/65 leading-relaxed space-y-6">
            <div className="bg-amber/10 border border-amber/20 rounded-card p-6 mb-8">
              <p className="font-body text-sm text-amber font-semibold">
                {lang === "fr"
                  ? "[CONTENU À COMPLÉTER] — La politique de confidentialité complète sera rédigée et ajoutée ici. En attendant, voici les éléments clés."
                  : "[CONTENT TO BE ADDED] — The full privacy policy will be drafted and added here. In the meantime, here are the key elements."}
              </p>
            </div>
            {lang === "fr" ? (
              <>
                <h2 className="font-heading font-bold text-obsidian text-xl">Collecte des données</h2>
                <p>Total Klean collecte uniquement les données que vous nous fournissez volontairement via nos formulaires de contact et de cotation (nom, e-mail, téléphone, informations sur votre véhicule).</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Utilisation des données</h2>
                <p>Vos données sont utilisées exclusivement pour répondre à vos demandes, vous envoyer des cotations et, avec votre consentement, vous informer de nos offres et actualités.</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Conservation</h2>
                <p>Vos données sont conservées pendant la durée nécessaire à la prestation du service et au maximum 3 ans après votre dernier contact avec Total Klean.</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Vos droits</h2>
                <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande, contactez-nous à contact@totalklean.com.</p>
              </>
            ) : (
              <>
                <h2 className="font-heading font-bold text-obsidian text-xl">Data collection</h2>
                <p>Total Klean only collects data you voluntarily provide via our contact and quote forms (name, email, phone, vehicle information).</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Data use</h2>
                <p>Your data is used exclusively to respond to your requests, send you quotes and, with your consent, inform you of our offers and news.</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Retention</h2>
                <p>Your data is kept for as long as necessary to provide the service and for a maximum of 3 years after your last contact with Total Klean.</p>
                <h2 className="font-heading font-bold text-obsidian text-xl">Your rights</h2>
                <p>You have the right to access, rectify and delete your data. For any request, contact us at contact@totalklean.com.</p>
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
