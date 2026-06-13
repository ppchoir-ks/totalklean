import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CotationForm } from "@/components/sections/CotationForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  const info = [
    {
      icon: Phone,
      label: lang === "fr" ? "Téléphone" : "Phone",
      value: "+243 997 806 193",
      href: "tel:+243997806193",
      color: "bg-baltic/10 text-baltic",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+243 997 806 193",
      href: "https://wa.me/243997806193?text=Bonjour%20Total%20Klean%20!",
      color: "bg-[#25D366]/10 text-[#25D366]",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@totalklean.com",
      href: "mailto:contact@totalklean.com",
      color: "bg-aqua/10 text-aqua",
    },
    {
      icon: MapPin,
      label: lang === "fr" ? "Adresse" : "Address",
      value: "N°16, Rue Rachidi Tumbula\nGoma, RDC",
      href: null,
      color: "bg-amber/10 text-amber",
    },
    {
      icon: Clock,
      label: lang === "fr" ? "Horaires" : "Hours",
      value: lang === "fr" ? "Lun–Sam : 8h00 – 18h00\nDim : Sur rendez-vous" : "Mon–Sat: 8am – 6pm\nSun: By appointment",
      href: null,
      color: "bg-baltic/10 text-baltic",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Total Klean"
        heading={lang === "fr" ? "Écrivez-nous !" : "Write to us!"}
        subtext={lang === "fr"
          ? "Une question, une demande de cotation, ou simplement envie d'en savoir plus ? Nous sommes à votre écoute."
          : "A question, a quote request, or just want to know more? We're here to help."}
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-5">
              {info.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-obsidian/40 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-sm text-obsidian hover:text-baltic transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-obsidian whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="mt-6 h-52 bg-[#f8f9fc] rounded-card flex items-center justify-center border border-black/5">
                <div className="text-center">
                  <MapPin size={28} className="text-baltic/30 mx-auto mb-2" />
                  <p className="font-body text-xs text-obsidian/40">
                    {lang === "fr" ? "[Carte à intégrer — Google Maps]" : "[Map to integrate — Google Maps]"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-7">
                {lang === "fr" ? "Envoyez-nous un message" : "Send us a message"}
              </h2>
              <CotationForm locale={lang} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
