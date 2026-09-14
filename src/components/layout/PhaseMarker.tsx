import { site } from "@/data/site";

/**
 * Phase 1 build marker.
 *
 * This band exists so the page has real scroll length — it is what the header's
 * scrolled state, the hero parallax and the scroll cue are tested against.
 * It is labelled honestly rather than filled with placeholder marketing copy,
 * and is replaced by the property search + featured properties sections in the
 * next phase.
 */
export function PhaseMarker({ id }: { id: string }) {
  const upcoming = [
    "Property search",
    "Featured properties",
    "Horizontal property scroll",
    "Dubai communities",
    "Buy / Sell / Invest",
    "Signature brand moment",
  ];

  return (
    <section id={id} data-surface="light" className="bg-bone text-ink">
      <div className="shell flex min-h-[100svh] flex-col justify-center py-[var(--spacing-section)]">
        <p className="label-caps flex items-center gap-4 text-ash-400">
          <span aria-hidden="true" className="block h-px w-10 bg-champagne sm:w-14" />
          Build status
        </p>

        <h2 className="display-serif mt-8 max-w-[16ch] text-h1 text-ink">
          Find Your Next Address.
        </h2>

        <p className="mt-7 max-w-[52ch] text-lead font-light text-ash-400">
          Phase 1 is complete: foundation, design system, header, navigation and the
          cinematic hero. The sections below arrive in Phase 2.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-0 border-t border-ash-200 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-5 border-b border-ash-200 py-5"
            >
              <span className="label-caps text-[0.6rem] text-ash-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-ash-500">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-[60ch] text-body-sm text-ash-300">
          Imagery on this build is free-licence demo photography and is not owned by{" "}
          {site.brand}. Replace it with licensed photography before launch.
        </p>
      </div>
    </section>
  );
}
