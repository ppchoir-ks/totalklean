import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { MobileBand } from "@/components/sections/MobileBand";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Realisations } from "@/components/sections/Realisations";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogTeaser } from "@/components/sections/BlogTeaser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "home");
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <MobileBand />
      <Realisations />
      <Testimonials />
      <BlogTeaser />
    </>
  );
}
