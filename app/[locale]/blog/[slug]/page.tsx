import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard, SectionBlobs } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() {
  return posts.flatMap((p) => [
    { locale: "fr", slug: p.slug },
    { locale: "en", slug: p.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const lang = locale as "fr" | "en";
  return {
    title: `${post[lang].title} | Total Klean`,
    description: post[lang].excerpt,
    openGraph: {
      title: post[lang].title,
      description: post[lang].excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as "fr" | "en";
  const post = getPost(slug);
  if (!post) notFound();

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const paragraphs = post[lang].content.split("\n\n").filter(Boolean);

  return (
    <>
      {/* Article hero */}
      <div className="relative h-[460px] md:h-[520px] bg-obsidian">
        <Image
          src={post.image}
          alt={post[lang].title}
          fill
          className="object-cover opacity-45"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/50 to-obsidian/20" />
        <div className="absolute bottom-0 left-0 right-0 pb-10 md:pb-14">
          <Container>
            <FadeIn y={20}>
              <span className="inline-block bg-aqua/20 text-aqua font-body text-xs font-semibold px-3 py-1 rounded-full mb-5">
                {post.tag}
              </span>
              <h1 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
                {post[lang].title}
              </h1>
              <p className="font-body text-white/40 text-sm mt-3">{formatDate(post.date)}</p>
            </FadeIn>
          </Container>
        </div>
      </div>

      <section className="relative py-20 bg-gradient-to-b from-[#f0f4f9] to-white overflow-hidden">
        <SectionBlobs variant="cool" />
        <Container className="relative z-10 max-w-3xl">
          <FadeIn>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 font-body text-sm text-obsidian/45 hover:text-baltic transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              {lang === "fr" ? "Retour au blog" : "Back to blog"}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_8px_40px_rgba(40,88,137,0.08)] rounded-2xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none font-body text-obsidian/70 leading-relaxed space-y-6">
                {paragraphs.map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h2 key={i} className="font-heading font-bold text-obsidian text-xl mt-8 mb-2">
                        {para.replace(/\*\*/g, "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ")) {
                    const items = para.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1">
                        {items.map((item, j) => (
                          <li key={j} className="text-obsidian/65 text-base">
                            {item.replace(/^- \*\*/, "").replace(/\*\*/, ": ").replace(/\*\*/g, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-base leading-relaxed text-obsidian/65">{para}</p>;
                })}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.2}>
            <div className="relative mt-8 p-8 rounded-2xl bg-obsidian overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-48 rounded-full bg-baltic/50 blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-56 h-40 rounded-full bg-aqua/20 blur-[70px]" />
              </div>
              <div className="relative z-10">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-aqua mb-3">
                  Total Klean
                </p>
                <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-2 leading-snug">
                  {lang === "fr" ? "Prêt à prendre soin de votre véhicule ?" : "Ready to take care of your vehicle?"}
                </h3>
                <p className="font-body text-white/55 text-sm mb-6 max-w-sm leading-relaxed">
                  {lang === "fr"
                    ? "Demandez une cotation gratuite. Nous vous revenons sous 24h."
                    : "Request a free quote. We'll get back to you within 24h."}
                </p>
                <Link
                  href={`/${locale}/cotation`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors duration-200 shadow-[0_4px_20px_rgba(239,118,47,0.35)]"
                >
                  {lang === "fr" ? "Demander une cotation" : "Request a quote"}
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="relative py-16 bg-white overflow-hidden">
          <Container className="max-w-3xl">
            <FadeIn>
              <h2 className="font-heading font-bold text-obsidian text-2xl mb-7">
                {lang === "fr" ? "Articles connexes" : "Related articles"}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map((rp, i) => (
                <FadeIn key={rp.slug} delay={i * 0.1}>
                  <Link
                    href={`/${locale}/blog/${rp.slug}`}
                    className="group flex items-start gap-4 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl p-5 shadow-[0_4px_20px_rgba(40,88,137,0.07)] hover:shadow-[0_16px_40px_rgba(40,88,137,0.14)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={rp.image} alt={rp[lang].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-body text-xs text-aqua font-semibold">{rp.tag}</span>
                      <h3 className="font-heading font-semibold text-obsidian text-sm mt-1 line-clamp-2 group-hover:text-baltic transition-colors">
                        {rp[lang].title}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 mt-2 font-body text-xs text-baltic group-hover:text-amber transition-colors">
                        {lang === "fr" ? "Lire" : "Read"} <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
