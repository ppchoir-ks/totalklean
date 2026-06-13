import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    id: "lavage",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1611189870994-5b3ac77a0fb3?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    featured: true,
    fr: {
      title: "Total Klean Mobile",
      desc: "Notre service phare : nous venons directement à vous, que vous soyez à domicile, au bureau ou n'importe où dans Goma. Tous nos services sont disponibles en version mobile avec le même niveau de qualité.",
      points: ["Déplacement à domicile ou au bureau", "Tous les services disponibles en mobile", "Équipements professionnels transportés sur place", "Disponible partout dans Goma et environs", "Sur rendez-vous — à votre convenance"],
    },
    en: {
      title: "Total Klean Mobile",
      desc: "Our flagship service: we come directly to you, whether at home, at the office or anywhere in Goma. All our services are available in mobile form with the same level of quality.",
      points: ["Home or office visits", "All services available mobile", "Professional equipment transported on-site", "Available anywhere in Goma and surroundings", "By appointment — at your convenience"],
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

  return (
    <>
      <PageHero
        eyebrow="Total Klean"
        heading={lang === "fr" ? "Nos services" : "Our services"}
        subtext={lang === "fr"
          ? "Une gamme complète de services pour restaurer, protéger et entretenir votre véhicule."
          : "A complete range of services to restore, protect and maintain your vehicle."}
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="space-y-24">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative h-72 lg:h-[400px] rounded-card overflow-hidden ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={svc.image}
                    alt={svc[lang].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {svc.featured && (
                    <span className="absolute top-4 left-4 bg-amber text-white font-body text-xs font-semibold px-3 py-1.5 rounded-full">
                      {lang === "fr" ? "Service phare" : "Flagship service"}
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-aqua mb-3">
                    {`0${i + 1}`}
                  </p>
                  <h2 className="font-heading font-bold text-obsidian text-3xl md:text-4xl mb-5">
                    {svc[lang].title}
                  </h2>
                  <p className="font-body text-obsidian/60 leading-relaxed mb-7">
                    {svc[lang].desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {svc[lang].points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle size={17} className="text-aqua mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-obsidian/70">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/cotation`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber text-white font-body font-semibold rounded-btn hover:bg-baltic transition-colors duration-200 group"
                  >
                    {lang === "fr" ? "Demander une cotation" : "Request a quote"}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#f8f9fc]">
        <Container className="text-center">
          <SectionHeading
            heading={lang === "fr" ? "Pas sûr du service dont vous avez besoin ?" : "Not sure which service you need?"}
            subtext={lang === "fr"
              ? "Contactez-nous — nous évaluerons votre véhicule et vous proposerons la solution adaptée."
              : "Contact us — we'll assess your vehicle and propose the right solution."}
            className="mb-8"
          />
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors duration-200"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </Link>
        </Container>
      </section>
    </>
  );
}
