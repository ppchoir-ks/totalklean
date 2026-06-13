import type { Metadata } from "next";

const BASE_TITLE = "Total Klean";
const BASE_URL = "https://www.totalklean.com";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const pageMeta: Record<string, Record<string, PageMeta>> = {
  fr: {
    home: {
      title: "Total Klean — Préparation esthétique automobile à Goma",
      description: "Services premium de lavage, polissage, protection céramique et rénovation automobile à Goma, RDC. Service mobile disponible — nous venons chez vous.",
      path: "/fr",
    },
    "a-propos": {
      title: "À propos — Total Klean",
      description: "Découvrez l'histoire, la mission et l'équipe de Total Klean — votre expert en préparation esthétique automobile à Goma, RDC.",
      path: "/fr/a-propos",
    },
    services: {
      title: "Nos Services — Total Klean",
      description: "Lavage, correction de peinture, protection céramique, rénovation des phares, nettoyage moteur et service mobile à Goma, RDC.",
      path: "/fr/services",
    },
    cotation: {
      title: "Demander une cotation — Total Klean",
      description: "Obtenez une estimation gratuite pour vos services de préparation esthétique automobile. Réponse sous 24h.",
      path: "/fr/cotation",
    },
    faq: {
      title: "FAQ — Total Klean",
      description: "Réponses aux questions fréquentes sur nos services de préparation esthétique automobile à Goma.",
      path: "/fr/faq",
    },
    opportunites: {
      title: "Opportunités & Formation — Total Klean",
      description: "Rejoignez l'équipe Total Klean ou participez à notre programme de formation en préparation esthétique automobile.",
      path: "/fr/opportunites",
    },
    blog: {
      title: "Blog — Total Klean",
      description: "Conseils d'entretien, actualités et stratégies pour prendre soin de votre véhicule.",
      path: "/fr/blog",
    },
    contact: {
      title: "Contact — Total Klean",
      description: "Contactez Total Klean par téléphone, WhatsApp ou email. Nous sommes à Goma, RDC.",
      path: "/fr/contact",
    },
  },
  en: {
    home: {
      title: "Total Klean — Premium Car Detailing in Goma",
      description: "Premium car washing, polishing, ceramic protection and restoration services in Goma, DRC. Mobile service available — we come to you.",
      path: "/en",
    },
    "a-propos": {
      title: "About Us — Total Klean",
      description: "Discover the story, mission and team behind Total Klean — your automotive detailing expert in Goma, DRC.",
      path: "/en/a-propos",
    },
    services: {
      title: "Our Services — Total Klean",
      description: "Washing, paint correction, ceramic protection, headlight restoration, engine cleaning and mobile service in Goma, DRC.",
      path: "/en/services",
    },
    cotation: {
      title: "Get a Quote — Total Klean",
      description: "Get a free estimate for your automotive detailing services. Response within 24h.",
      path: "/en/cotation",
    },
    faq: {
      title: "FAQ — Total Klean",
      description: "Answers to frequently asked questions about our automotive detailing services in Goma.",
      path: "/en/faq",
    },
    opportunites: {
      title: "Opportunities & Training — Total Klean",
      description: "Join the Total Klean team or take part in our automotive detailing training programme.",
      path: "/en/opportunites",
    },
    blog: {
      title: "Blog — Total Klean",
      description: "Maintenance tips, news and strategies for caring for your vehicle.",
      path: "/en/blog",
    },
    contact: {
      title: "Contact — Total Klean",
      description: "Contact Total Klean by phone, WhatsApp or email. We're based in Goma, DRC.",
      path: "/en/contact",
    },
  },
};

export function buildMetadata(locale: string, page: string): Metadata {
  const lang = locale === "en" ? "en" : "fr";
  const meta = pageMeta[lang][page];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: meta.path,
      languages: {
        fr: pageMeta.fr[page]?.path,
        en: pageMeta.en[page]?.path,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${meta.path}`,
      siteName: BASE_TITLE,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/assets/brand/logo-landscape.png`,
          width: 1200,
          alt: BASE_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
