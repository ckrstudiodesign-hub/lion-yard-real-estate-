import { TransitionLink } from "@/components/ui/TransitionLink";

/**
 * Breadcrumb trail.
 *
 * On narrow screens everything but the final two steps is dropped — a four-level
 * trail wrapping onto three lines tells the visitor less than a two-level one
 * that fits, and the header's back link covers the rest.
 */
export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          // Hide all but the last two crumbs on small screens.
          const hideOnMobile = index < items.length - 2;

          return (
            <li
              key={`${item.label}-${index}`}
              className={hideOnMobile ? "hidden items-center gap-3 sm:flex" : "flex items-center gap-3"}
            >
              {item.href && !last ? (
                <TransitionLink
                  href={item.href}
                  className="label-caps text-[0.55rem] tracking-[0.22em] text-current/45 transition-colors duration-[220ms] hover:text-current"
                >
                  {item.label}
                </TransitionLink>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="label-caps text-[0.55rem] tracking-[0.22em] text-current/80"
                >
                  {item.label}
                </span>
              )}
              {last ? null : (
                <span aria-hidden="true" className="block h-px w-4 bg-current/25" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
