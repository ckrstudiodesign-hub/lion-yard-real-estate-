"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { cn } from "@/lib/cn";
import type { PropertyImage as PropertyImageType } from "@/types/property";

/**
 * Property photograph with a graceful failure.
 *
 * If multiple images are passed, it crossfades through them smoothly every 5 seconds.
 *
 * The demo dataset points at third-party photography that this project does not
 * control — a URL can rot, a network can be restricted, an optimiser can fail.
 * Rather than leaving a hole in an editorial layout, a failed image falls back
 * to a charcoal plate carrying the property name, which still reads as a
 * deliberate card. The fallback disappears entirely once real photography is in.
 */
export function PropertyImage({
  image,
  images,
  fallbackLabel,
  sizes,
  priority = false,
  className,
}: {
  image: PropertyImageType;
  images?: PropertyImageType[];
  fallbackLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([0, 1]);

  const validImages = images && images.length > 0 ? images : [image];

  useEffect(() => {
    if (validImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        
        const next = (prev + 1) % validImages.length;
        const afterNext = (next + 1) % validImages.length;
        
        setLoadedIndexes((current) => {
          if (current.includes(afterNext)) return current;
          return [...current, afterNext];
        });
        
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [validImages.length]);

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
    <>
      {validImages.map((img, i) => {
        if (!loadedIndexes.includes(i) && validImages.length > 1) return null;
        
        return (
          <Image
            key={`${img.src}-${i}`}
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            quality={82}
            priority={priority && i === 0}
            loading={priority && i === 0 ? undefined : "lazy"}
            onError={() => setFailed(true)}
            className={cn(
              "object-cover object-center absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === currentIndex ? "opacity-100 z-10" : 
              i === previousIndex ? "opacity-100 z-0" : 
              "opacity-0 -z-10",
              className,
            )}
          />
        );
      })}
    </>
  );
}
