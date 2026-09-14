/** Detail skeleton: the hero block and the specification rail. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="h-[88svh] min-h-[32rem] w-full animate-pulse bg-charcoal" />
      <div className="shell border-b border-ink/12 bg-bone py-12">
        <span className="sr-only">Loading property</span>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index}>
              <div className="h-2.5 w-16 animate-pulse bg-ink/[0.06]" />
              <div className="mt-4 h-6 w-24 animate-pulse bg-ink/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
