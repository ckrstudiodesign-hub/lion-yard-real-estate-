"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Form field in the site's editorial language: a micro-caps label above a
 * baseline-ruled input. No boxes, no rounded corners, no filled backgrounds —
 * the same reasoning as the search controls.
 *
 * The error is wired with `aria-describedby` and `aria-invalid` so a screen
 * reader announces it with the field rather than as loose text.
 */
export function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
  required,
  multiline = false,
  tone = "light",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  error?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  tone?: "light" | "dark";
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const dark = tone === "dark";

  const control = cn(
    "peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 outline-none transition-colors duration-[300ms]",
    "text-body placeholder:text-transparent focus:ring-0",
    dark
      ? "border-bone/25 text-bone focus:border-bone"
      : "border-ink/20 text-ink focus:border-ink",
    error && (dark ? "border-[#E4A0A0]" : "border-[#A3401F]"),
  );

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "label-caps block text-[0.55rem] tracking-[0.26em]",
          dark ? "text-bone/45" : "text-ink/45",
        )}
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(control, "mt-2 resize-y")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(control, "mt-2 h-11")}
        />
      )}

      {error ? (
        <p
          id={errorId}
          className={cn(
            "mt-2.5 text-body-sm",
            dark ? "text-[#E4A0A0]" : "text-[#A3401F]",
          )}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
