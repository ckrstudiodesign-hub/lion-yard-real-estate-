"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";
import type { PropertyImage as PropertyImageType } from "@/types/property";

/**
 * Property photograph with a graceful failure.
 *
 * The demo dataset points at third-party photography that this project does not
 * control — a URL can rot, a network can be restricted, an optimiser can fail.
 * Rather than leaving a hole in an editorial layout, a failed image falls back
 * to a charcoal plate carrying the property name, which still reads as a
 * deliberate card. The fallback disappears entirely once real photography is in.
 */
export function PropertyImage({
  image,
  fallbackLabel,
  sizes,
  priority = false,
  className,
}: {
  image: PropertyImageType;
  fallbackLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-charcoal px-6",
          className,
        )}
      >
        <span className="label-caps text-center text-[0.6rem] text-bone/45">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      quality={82}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setFailed(true)}
      className={cn("object-cover object-center", className)}
    />
  );
}
