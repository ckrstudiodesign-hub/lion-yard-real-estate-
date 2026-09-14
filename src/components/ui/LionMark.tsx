import type { SVGProps } from "react";

/**
 * Lion Yard emblem — an original heraldic mark.
 *
 * A single shield built from architectural planes, with the lion suggested by
 * three marks rather than drawn. Restraint is the point: the brand's power
 * comes from typography and composition, not from a mascot.
 *
 * Inherits `currentColor`, so it inverts cleanly against dark and light headers.
 */
export function LionMark({
  className,
  title,
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {/* Shield / mane */}
      <path
        d="M24 3.5 41 13.2v15.4C41 37.9 33.4 45 24 45S7 37.9 7 28.6V13.2L24 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Brow line — the single horizontal that gives the mark its confidence */}
      <path
        d="M13.5 21.5h21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      {/* Eyes */}
      <path
        d="M16.5 26.6h4.2M27.3 26.6h4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      {/* Muzzle */}
      <path d="M24 31.4 20.9 35.2h6.2L24 31.4Z" fill="currentColor" />
    </svg>
  );
}
