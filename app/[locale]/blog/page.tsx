import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { posts } from "@/lib/blog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "blog");
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "fr" | "en";

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        heading={lang === "fr" ? "Actualités récentes" : "Recent news"}
        subtext={lang === "fr"
          ? "Conseils, actualités et stratégies d'entretien automobile par Total Klean."
          : "Tips, news and car care strategies from Total Klean."}
      />

      <section className="py-24 bg-white">
        <Container>
          {/* Featured post */}
          <Link
            href={`/${locale}/blog/${posts[0].slug}`}
            className="group grid md:grid-cols-2 gap-8 bg-[#f8f9fc] rounded-card overflow-hidden mb-12 hover:shadow-md transition-shadow"
          >
            <div className="relative h-64 md:h-auto min-h-64">
              <Image
                src={posts[0].image}
                alt={posts[0][lang].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-aqua/10 text-aqua font-body text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                {posts[0].tag}
              </span>
              <h2 className="font-heading font-bold text-obsidian text-2xl md:text-3xl mb-4 group-hover:text-baltic transition-colors leading-tight">
                {posts[0][lang].title}
              </h2>
              <p className="font-body text-sm text-obsidian/55 leading-relaxed mb-6">
                {posts[0][lang].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-obsidian/40">{formatDate(posts[0].date)}</span>
                <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-baltic group-hover:text-amber transition-colors">
                  {lang === "fr" ? "Lire l'article" : "Read article"} <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          {/* Other posts */}
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-card border border-black/5 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post[lang].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-baltic font-body text-xs font-semibold px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-obsidian text-lg mb-3 group-hover:text-baltic transition-colors line-clamp-2">
                    {post[lang].title}
                  </h3>
                  <p className="font-body text-sm text-obsidian/55 leading-relaxed line-clamp-2 flex-1">
                    {post[lang].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-body text-xs text-obsidian/40">{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-baltic group-hover:text-amber transition-colors">
                      {lang === "fr" ? "Lire" : "Read"} <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
