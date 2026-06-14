"use client";

const clients = [
  { src: "/assets/brand/imagery/save-the-children.svg", alt: "Save the Children" },
  { src: "/assets/brand/imagery/UNICEF-Logo-1986.png", alt: "UNICEF" },
  { src: "/assets/brand/imagery/CANALBOX.png", alt: "Canal Box" },
  { src: "/assets/brand/imagery/HEKIMA.png", alt: "Hekima Épargne & Crédit" },
  { src: "/assets/brand/imagery/FRONTLINE.png", alt: "Frontline Security" },
  { src: "/assets/brand/imagery/AGL.png", alt: "Africa Global Logistics" },
  { src: "/assets/brand/imagery/oxfam-logo.svg", alt: "Oxfam" },
];

export function LogoMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <div className="mt-8 pt-6 border-t border-black/5">
      <p className="text-center font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-baltic/60 mb-4">
        Ils nous font confiance
      </p>

      <div className="relative overflow-hidden py-3">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          className="flex items-center"
          style={{
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
        >
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 flex items-center justify-center h-20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.src}
                alt={client.alt}
                style={{ height: "52px", width: "auto", maxWidth: "180px", objectFit: "contain", filter: "brightness(0) opacity(0.85)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
