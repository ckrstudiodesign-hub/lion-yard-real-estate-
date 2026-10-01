import Image from "next/image";

const PARTNERS = [
  { name: "Nakheel", src: "/Partners/Nakheel.jpg" },
  { name: "Sobha", src: "/Partners/sobha-realty.png" },
  { name: "Azizi", src: "/Partners/Azizi.png" },
  { name: "Dasnac", src: "/Partners/dasnac.png" },
  { name: "Damac", src: "/Partners/Damac.png" },
  { name: "Danube", src: "/Partners/Danube.png" },
  { name: "Binghatti", src: "/Partners/Binghatti.webp" },
  { name: "Dugasta", src: "/Partners/dugasta.png" },
];

export function Partners() {
  return (
    <section className="bg-bone text-ink py-16 overflow-hidden">
      <div className="shell mb-10 text-center">
        <h2 className="text-h3 font-light">Our Trusted Developers</h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex w-max min-w-full shrink-0 items-center justify-around gap-12 sm:gap-24 px-12 sm:px-24 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {PARTNERS.map((partner, i) => (
            <div key={`partner-1-${i}`} className="relative h-10 sm:h-12 w-28 sm:w-40 flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <Image
                src={partner.src}
                alt={`${partner.name} logo`}
                width={160}
                height={60}
                className="max-h-full w-auto object-contain mix-blend-multiply"
              />
            </div>
          ))}
          {/* Duplicate set for infinite scrolling */}
          {PARTNERS.map((partner, i) => (
            <div key={`partner-2-${i}`} className="relative h-10 sm:h-12 w-28 sm:w-40 flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <Image
                src={partner.src}
                alt={`${partner.name} logo`}
                width={160}
                height={60}
                className="max-h-full w-auto object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
