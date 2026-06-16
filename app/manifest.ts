import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Total Klean",
    short_name: "Total Klean",
    description:
      "Services premium de lavage et préparation esthétique automobile à Goma, RDC.",
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#17181A",
    theme_color: "#17181A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
