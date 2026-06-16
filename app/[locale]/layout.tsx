import type { Metadata, Viewport } from "next";
import { Kanit, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import "../globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#17181A",
};

export const metadata: Metadata = {
  title: "Total Klean | Votre véhicule autrement",
  description:
    "Services premium de lavage et préparation esthétique automobile à Goma, RDC. Céramique, polissage, rénovation, livrés directement chez vous.",
  openGraph: {
    siteName: "Total Klean",
    type: "website",
  },
  // Standalone PWA: full-screen, content behind the status bar (app-like)
  appleWebApp: {
    capable: true,
    title: "Total Klean",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${kanit.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-white text-obsidian antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber focus:text-white focus:font-body focus:font-semibold focus:rounded-btn focus:shadow-lg"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
<NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Header />
            <main id="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
