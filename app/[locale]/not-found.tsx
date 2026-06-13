import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="font-heading font-bold text-8xl text-baltic/10 mb-4">404</p>
        <h1 className="font-heading font-bold text-obsidian text-3xl mb-3">
          Page introuvable
        </h1>
        <p className="font-body text-obsidian/55 mb-8">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/fr"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
