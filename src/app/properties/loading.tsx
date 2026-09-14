/**
 * Listing skeleton. Deliberately minimal: a masthead block and a suggestion of
 * a grid. Elaborate skeletons that mimic every element cost more to maintain
 * than they return, and flash more than they reassure.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="h-[68svh] min-h-[26rem] w-full animate-pulse bg-charcoal lg:h-[74svh]" />
      <div className="shell py-[var(--spacing-section)]">
        <span className="sr-only">Loading properties</span>
        <div className="h-10 w-64 animate-pulse bg-ink/[0.06]" />
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <div className="aspect-[4/5] w-full animate-pulse bg-ink/[0.06]" />
              <div className="mt-8 h-3 w-24 animate-pulse bg-ink/[0.06]" />
              <div className="mt-5 h-7 w-3/5 animate-pulse bg-ink/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
