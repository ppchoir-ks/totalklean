import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CotationForm } from "@/components/sections/CotationForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

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
        eyebrow={lang === "fr" ? "Gratuit & sans engagement" : "Free & no commitment"}
        heading={lang === "fr" ? "Demander une cotation" : "Request a quote"}
        subtext={lang === "fr"
          ? "Décrivez votre véhicule et le service souhaité — nous vous revenons rapidement avec une estimation personnalisée."
          : "Describe your vehicle and the service you need — we'll get back to you quickly with a personalised estimate."}
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Form — wider col */}
            <div className="lg:col-span-3">
              <CotationForm locale={lang} />
            </div>

            {/* Contact sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#f8f9fc] rounded-card p-7">
                <h3 className="font-heading font-semibold text-obsidian text-lg mb-5">
                  {lang === "fr" ? "Ou contactez-nous directement" : "Or contact us directly"}
                </h3>
                <div className="space-y-4">
                  <a href="tel:+243997806193" className="flex items-center gap-3 font-body text-sm text-obsidian/70 hover:text-baltic transition-colors">
                    <div className="w-9 h-9 bg-baltic/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={15} className="text-baltic" />
                    </div>
                    +243 997 806 193
                  </a>
                  <a
                    href="https://wa.me/243997806193?text=Bonjour%20Total%20Klean%2C%20je%20souhaite%20obtenir%20une%20cotation%20pour%20mon%20v%C3%A9hicule."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-sm text-obsidian/70 hover:text-baltic transition-colors"
                  >
                    <div className="w-9 h-9 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={15} className="text-[#25D366]" />
                    </div>
                    WhatsApp
                  </a>
                  <a href="mailto:contact@totalklean.com" className="flex items-center gap-3 font-body text-sm text-obsidian/70 hover:text-baltic transition-colors">
                    <div className="w-9 h-9 bg-aqua/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={15} className="text-aqua" />
                    </div>
                    contact@totalklean.com
                  </a>
                  <div className="flex items-start gap-3 font-body text-sm text-obsidian/70">
                    <div className="w-9 h-9 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={15} className="text-amber" />
                    </div>
                    N°16, Rue Rachidi Tumbula, Goma, RDC
                  </div>
                </div>
              </div>

              <div className="bg-baltic rounded-card p-7 text-white">
                <h3 className="font-heading font-semibold text-lg mb-2">Total Klean Mobile</h3>
                <p className="font-body text-sm text-white/70 leading-relaxed mb-4">
                  {lang === "fr"
                    ? "Nous pouvons nous déplacer directement chez vous ou à votre lieu de travail — mentionnez-le dans votre message."
                    : "We can come directly to your home or workplace — mention it in your message."}
                </p>
                <a
                  href="https://wa.me/243997806193?text=Bonjour%20Total%20Klean%2C%20je%20souhaite%20le%20service%20mobile."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber text-white font-body text-sm font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors"
                >
                  <MessageCircle size={14} />
                  {lang === "fr" ? "Réserver via WhatsApp" : "Book via WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
