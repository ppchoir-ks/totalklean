export interface BlogPost {
  slug: string;
  tag: string;
  image: string;
  date: string;
  fr: { title: string; excerpt: string; content: string };
  en: { title: string; excerpt: string; content: string };
}

export const posts: BlogPost[] = [
  {
    slug: "nettoyage-regulier-essentiel",
    tag: "Lavage",
    image: "/assets/blog/blog-lavage.jpg",
    date: "2025-01-15",
    fr: {
      title: "Entretenir son véhicule : Pourquoi un nettoyage régulier est-il essentiel ?",
      excerpt: "Un entretien régulier préserve la valeur de votre véhicule et prolonge sa durée de vie. Découvrez pourquoi.",
      content: `Un véhicule propre n'est pas qu'une question d'esthétique. Un entretien régulier protège votre investissement, maintient la valeur de revente et prévient des dommages coûteux à long terme.

**La saleté : un ennemi silencieux**

La boue, le sel de route, les polluants et les fientes d'oiseaux sont acides et attaquent progressivement la peinture si on les laisse s'incruster. Un nettoyage régulier, au minimum toutes les deux semaines, empêche ces dépôts de s'accumuler et d'entamer le vernis.

**Préserver la valeur de revente**

Un véhicule bien entretenu visuellement se vend plus rapidement et à un meilleur prix. Les acheteurs potentiels associent la propreté à un entretien mécanique soigné, et ils ont souvent raison.

**L'intérieur compte autant**

Poussière, miettes, odeurs et taches sur les sièges dégradent le confort et peuvent abîmer les revêtements de manière permanente. Un nettoyage intérieur régulier maintient un habitacle sain et agréable.

**Total Klean à votre service**

Chez Total Klean, nous proposons des formules de lavage adaptées à vos besoins et à votre budget, y compris notre service mobile qui se déplace directement chez vous à Goma et ses environs.`,
    },
    en: {
      title: "Vehicle Maintenance: Why Regular Cleaning Is Essential",
      excerpt: "Regular maintenance preserves your vehicle's value and extends its lifespan. Find out why.",
      content: `A clean vehicle isn't just about aesthetics. Regular maintenance protects your investment, maintains resale value and prevents costly long-term damage.

**Dirt: a silent enemy**

Mud, road salt, pollutants and bird droppings are acidic and progressively attack the paintwork if left to set. Regular cleaning, at least every two weeks, prevents these deposits from building up and eating into the lacquer.

**Preserving resale value**

A visually well-maintained vehicle sells faster and at a better price. Potential buyers associate cleanliness with careful mechanical maintenance, and they're often right.

**The interior matters just as much**

Dust, crumbs, odours and stains on the seats degrade comfort and can permanently damage the upholstery. Regular interior cleaning keeps the cabin healthy and pleasant.

**Total Klean at your service**

At Total Klean, we offer washing packages tailored to your needs and budget, including our mobile service that comes directly to you in Goma and the surrounding area.`,
    },
  },
  {
    slug: "polissage-excellence-total-klean",
    tag: "Polissage",
    image: "/assets/blog/blog-polissage.jpg",
    date: "2025-02-08",
    fr: {
      title: "Polissage automobile : L'excellence signée Total Klean",
      excerpt: "Notre technique de polissage redonne à votre carrosserie l'éclat du neuf en éliminant rayures et oxydation.",
      content: `Le polissage professionnel est l'une des interventions les plus transformatrices que vous puissiez faire subir à votre véhicule. En quelques heures, une carrosserie terne et striée retrouve l'éclat de ses premières années.

**Qu'est-ce que le polissage ?**

Le polissage consiste à abraser microscopiquement la couche de vernis pour éliminer les imperfections : rayures légères, marques de tourbillon (swirl marks), oxydation et dépôts tenaces. Contrairement à ce que beaucoup pensent, on n'enlève pas la peinture : on corrige le vernis de protection.

**Notre processus en trois étapes**

1. **Inspection et préparation** : Nous évaluons l'état de la peinture à la lumière directionnelle pour identifier chaque imperfection et choisir le bon abrasif.
2. **Correction machine** : Nos techniciens utilisent des polisheuses orbitales et rotatives professionnelles avec des abrasifs graduels pour effacer les défauts sans brûler le vernis.
3. **Finition et protection** : Une cire ou un sealant est appliqué pour sceller le résultat et prolonger l'éclat.

**Quand faire polir son véhicule ?**

Dès que vous observez des micro-rayures visibles en plein soleil, une perte d'éclat ou un aspect terne en général. Pour les véhicules foncés (noir, bleu navy, gris anthracite), le polissage est particulièrement recommandé car les imperfections y sont plus visibles.

Contactez Total Klean pour une évaluation gratuite de votre peinture.`,
    },
    en: {
      title: "Car Polishing: Excellence by Total Klean",
      excerpt: "Our polishing technique restores your bodywork's showroom shine by eliminating scratches and oxidation.",
      content: `Professional polishing is one of the most transformative treatments you can give your vehicle. In a few hours, dull, scratched bodywork regains the shine of its early years.

**What is polishing?**

Polishing involves microscopically abrading the lacquer layer to remove imperfections: light scratches, swirl marks, oxidation and stubborn deposits. Contrary to what many think, we're not removing paint: we're correcting the protective clear coat.

**Our three-step process**

1. **Inspection and preparation**: We assess the condition of the paint under directional light to identify every imperfection and choose the right abrasive.
2. **Machine correction**: Our technicians use professional orbital and rotary polishers with graduated abrasives to erase defects without burning the lacquer.
3. **Finishing and protection**: A wax or sealant is applied to lock in the result and prolong the shine.

**When should you have your vehicle polished?**

As soon as you notice micro-scratches visible in full sunlight, loss of gloss or a generally dull appearance. For dark-coloured vehicles (black, navy blue, anthracite grey), polishing is especially recommended as imperfections are more visible.

Contact Total Klean for a free paint assessment.`,
    },
  },
  {
    slug: "total-klean-mobile-innovation-goma",
    tag: "Mobile",
    image: "/assets/blog/blog-mobile.jpg",
    date: "2025-03-20",
    fr: {
      title: "Total Klean Mobile : L'innovation au service du nettoyage automobile à Goma",
      excerpt: "Nous apportons nos services directement à vous, à domicile ou au bureau, partout dans Goma.",
      content: `Dans une ville dynamique comme Goma, le temps est précieux. C'est de ce constat qu'est né Total Klean Mobile : un service de préparation esthétique automobile qui vient directement à vous.

**Comment ça fonctionne ?**

C'est simple : vous nous contactez pour fixer un rendez-vous, et notre équipe se déplace avec tout l'équipement nécessaire (eau, aspirateurs professionnels, produits de traitement) directement à votre adresse.

**Les avantages du service mobile**

- **Gain de temps** : Pas besoin de se déplacer. Votre véhicule est traité pendant que vous vaquiez à vos occupations.
- **Flexibilité** : Nous intervenons le matin, l'après-midi ou selon vos contraintes, même au bureau.
- **Même qualité** : Nos techniciens disposent du même matériel qu'à l'atelier. La qualité ne souffre d'aucun compromis.
- **Zone de couverture** : Nous intervenons dans toute la ville de Goma et ses environs immédiats.

**Quels services en mobile ?**

La totalité de nos services sont disponibles en version mobile : lavage basique et complet, correction de peinture légère, rénovation des phares et nettoyage moteur. Seule la protection céramique complète nécessite parfois un environnement contrôlé : nous vous le précisons lors de la cotation.

Réservez dès maintenant via WhatsApp ou notre formulaire en ligne.`,
    },
    en: {
      title: "Total Klean Mobile: Innovation in Car Cleaning in Goma",
      excerpt: "We bring our services directly to you, at home or at the office, anywhere in Goma.",
      content: `In a dynamic city like Goma, time is precious. This is the insight behind Total Klean Mobile: an automotive detailing service that comes directly to you.

**How does it work?**

It's simple: you contact us to set an appointment, and our team comes with all the necessary equipment (water, professional vacuums, treatment products) directly to your address.

**The advantages of the mobile service**

- **Time saving**: No need to travel. Your vehicle is treated while you go about your business.
- **Flexibility**: We work in the morning, afternoon or according to your constraints, even at the office.
- **Same quality**: Our technicians have the same equipment as at the workshop. Quality is never compromised.
- **Coverage area**: We operate throughout the city of Goma and its immediate surroundings.

**Which services are available mobile?**

All of our services are available in mobile form: basic and full wash, light paint correction, headlight restoration and engine cleaning. Only a full ceramic protection sometimes requires a controlled environment: we'll specify this during the quote.

Book now via WhatsApp or our online form.`,
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
