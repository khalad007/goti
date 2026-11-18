"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const text =
  "Before the engine, there is a need. A road that must be crossed, a load that must be carried, a family that must get home. Every rickshaw, every motorcycle, every car is a promise to keep moving. GOTI is a look at those machines, and the small parts that make that promise last.";

const facts = [
  { label: "Two-wheelers", note: "The everyday heartbeat" },
  { label: "Three-wheelers", note: "The workhorse of the street" },
  { label: "Cars", note: "Comfort over distance" },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".mf-word");
      const factItems = gsap.utils.toArray<HTMLElement>(".mf-fact");

      if (reduce) {
        gsap.set(words, { opacity: 1 });
        gsap.set(factItems, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + window.innerHeight * 2.2,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(words, {
        opacity: 1,
        stagger: 0.12,
        ease: "none",
        duration: words.length * 0.12,
      });

      tl.to(
        factItems,
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          ease: "power2.out",
          duration: 0.9,
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-bg px-6 py-20 md:px-10"
    >
      <p className="mb-8 text-xs uppercase tracking-[0.4em] text-accent md:mb-12">
        01 &nbsp;/&nbsp; Manifesto
      </p>

      <p
        ref={wordsRef}
        className="max-w-[1300px] font-display text-[9.5vw] leading-[0.95] tracking-tight sm:text-[7vw] md:text-[5.6vw]"
        aria-label={text}
      >
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            aria-hidden
            className="mf-word inline-block pr-[0.25em] opacity-15"
          >
            {word}
          </span>
        ))}
      </p>

      <div
        ref={factsRef}
        className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3 md:mt-16"
      >
        {facts.map((f) => (
          <div
            key={f.label}
            className="mf-fact translate-y-6 opacity-0"
          >
            <p className="font-display text-3xl text-accent md:text-4xl">
              {f.label}
            </p>
            <p className="mt-1 text-sm text-muted">{f.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}