import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "Twitter / X", href: "#", Icon: IconX },
  { label: "LinkedIn", href: "#", Icon: IconLinkedin },
  { label: "TikTok", href: "#", Icon: IconTikTok },
];

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();
  const href = (path: string) => `/${locale}${path}`;

  const services = [
    { key: "nav.wash", href: "/services#lavage" },
    { key: "nav.paint", href: "/services#correction-peinture" },
    { key: "nav.ceramic", href: "/services#ceramique" },
    { key: "nav.headlights", href: "/services#phares" },
    { key: "nav.engine", href: "/services#moteur" },
    { key: "nav.mobile", href: "/services#mobile" },
  ];

  return (
    <footer className="bg-obsidian text-white">
      {/* CTA band */}
      <div className="bg-baltic py-16">
        <Container className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-aqua mb-3">
            Total Klean
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            {locale === "fr"
              ? "Prêt à redonner de l'éclat à votre véhicule ?"
              : "Ready to restore your vehicle's brilliance?"}
          </h2>
          <Link
            href={href("/cotation")}
            className="inline-block px-8 py-4 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors duration-200"
          >
            {t("common.getQuote")}
          </Link>
        </Container>
      </div>

      {/* Main footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/brand/logo-landscape.png"
              alt="Total Klean"
              width={140}
              height={42}
              className="h-9 w-auto object-contain mb-5 brightness-0 invert"
            />
            <p className="font-body text-sm text-white/60 leading-relaxed">
              {t("footer.mission")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ label, href: socialHref, Icon }) => (
                <a
                  key={label}
                  href={socialHref}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2.5">
              {services.map(({ key, href: serviceHref }) => (
                <li key={key}>
                  <Link
                    href={href(serviceHref)}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(key as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              {locale === "fr" ? "Navigation" : "Navigation"}
            </h3>
            <ul className="space-y-2.5">
              {[
                { key: "nav.home", href: "/" },
                { key: "nav.about", href: "/a-propos" },
                { key: "nav.quote", href: "/cotation" },
                { key: "nav.faq", href: "/faq" },
                { key: "nav.blog", href: "/blog" },
                { key: "nav.contact", href: "/contact" },
              ].map(({ key, href: navHref }) => (
                <li key={key}>
                  <Link
                    href={href(navHref)}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(key as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">
              {t("nav.contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-aqua mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-white/70">
                  {t("contact.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-aqua flex-shrink-0" />
                <a
                  href={`tel:${t("contact.phone_num").replace(/\s/g, "")}`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  {t("contact.phone_num")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-aqua flex-shrink-0" />
                <a
                  href={`mailto:${t("contact.email_addr")}`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  {t("contact.email_addr")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {year} Total Klean. {t("footer.rights")}
          </p>
          <Link
            href={href("/politique-de-confidentialite")}
            className="font-body text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            {t("footer.privacy")}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
