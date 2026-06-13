import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    title: `${post[lang].title} — Total Klean`,
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
      <div className="relative h-72 md:h-96 bg-obsidian">
        <Image
          src={post.image}
          alt={post[lang].title}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-obsidian/20" />
        <div className="absolute bottom-0 left-0 right-0 pb-10 pt-32">
          <Container>
            <span className="inline-block bg-aqua/20 text-aqua font-body text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.tag}
            </span>
            <h1 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              {post[lang].title}
            </h1>
            <p className="font-body text-white/50 text-sm mt-3">{formatDate(post.date)}</p>
          </Container>
        </div>
      </div>

      <section className="py-16 bg-white">
        <Container className="max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 font-body text-sm text-obsidian/50 hover:text-baltic transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            {lang === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>

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

          {/* CTA */}
          <div className="mt-14 bg-baltic rounded-card p-8 text-white">
            <h3 className="font-heading font-bold text-xl mb-2">
              {lang === "fr" ? "Prêt à prendre soin de votre véhicule ?" : "Ready to take care of your vehicle?"}
            </h3>
            <p className="font-body text-white/70 text-sm mb-5">
              {lang === "fr"
                ? "Demandez une cotation gratuite — nous vous revenons sous 24h."
                : "Request a free quote — we'll get back to you within 24h."}
            </p>
            <Link
              href={`/${locale}/cotation`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber text-white font-body font-semibold rounded-btn hover:bg-white hover:text-obsidian transition-colors"
            >
              {lang === "fr" ? "Demander une cotation" : "Request a quote"}
            </Link>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-[#f8f9fc]">
          <Container>
            <h2 className="font-heading font-bold text-obsidian text-2xl mb-8">
              {lang === "fr" ? "Articles connexes" : "Related articles"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${locale}/blog/${rp.slug}`}
                  className="group flex items-start gap-4 bg-white rounded-card p-5 border border-black/5 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={rp.image} alt={rp[lang].title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-body text-xs text-aqua font-semibold">{rp.tag}</span>
                    <h3 className="font-heading font-semibold text-obsidian text-sm mt-1 line-clamp-2 group-hover:text-baltic transition-colors">
                      {rp[lang].title}
                    </h3>
                    <span className="inline-flex items-center gap-0.5 mt-2 font-body text-xs text-baltic">
                      {lang === "fr" ? "Lire" : "Read"} <ArrowUpRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
