"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { useSectionReveal } from "@/lib/reveal";

export const TEAM_MEMBERS = [
  {
    name: "AFTAB ALAM",
    role: "Senior Property Consultant",
    image: "/team/AFTAB ALAM.jpeg",
  },
  {
    name: "Atif mahmood",
    role: "Luxury Property Specialist",
    image: "/team/Atif mahmood.jpeg",
  },
  {
    name: "IMRAN AHMAD",
    role: "Senior Investment Advisor",
    image: "/team/IMRAN AHMAD.jpeg",
  },
  {
    name: "IRAM IQBAL",
    role: "Client Relationship Manager",
    image: "/team/IRAM IQBAL.jpeg",
  },
  {
    name: "Nasir mahmood shamsi",
    role: "Senior Real Estate Consultant",
    image: "/team/Nasir mahmood shamsi.jpeg",
  },
  {
    name: "Nehal Alam Khan",
    role: "Portfolio & Investment Advisor",
    image: "/team/Nehal Alam Khan.jpeg",
  },
] as const;

export function Team() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { start: "top 80%", stagger: 0.06 });

  return (
    <section
      ref={ref}
      className="bg-bone-alt py-12 lg:py-16 text-ink"
      data-surface="light"
      aria-labelledby="team-heading"
      id="our-team"
    >
      <div className="shell">
        <header className="max-w-xl">
          <p data-reveal="item" className="label-caps flex items-center gap-3 text-ink/40 text-[10px]">
            <span aria-hidden="true" className="block h-px w-8 bg-champagne sm:w-10" />
            Our Advisory Team
          </p>
          <h2
            id="team-heading"
            data-reveal="item"
            className="display-serif mt-3 text-2xl sm:text-3xl lg:text-4xl leading-tight"
          >
            The people behind Lion Yard.
          </h2>
          <p
            data-reveal="item"
            className="mt-2 text-xs sm:text-sm text-ink/60 font-light max-w-lg leading-relaxed"
          >
            A dedicated team of Dubai real estate specialists committed to discreet,
            tailored advisory and seamless property acquisitions.
          </p>
        </header>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.article
              key={member.name}
              data-reveal="item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col items-start"
            >
              {/* Photo Frame - compact aspect ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal/10 shadow-sm border border-ink/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Information */}
              <div className="mt-3 w-full">
                <span className="block text-[9px] uppercase tracking-[0.16em] text-ink/50 font-medium truncate">
                  {member.role}
                </span>

                <h3 className="display-serif mt-1 text-sm sm:text-base lg:text-lg font-medium leading-tight text-ink transition-colors duration-300 group-hover:text-champagne truncate">
                  {member.name}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
