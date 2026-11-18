"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const parts = [
  {
    id: "engine",
    index: "01",
    name: "ENGINE",
    bangla: "ইঞ্জিন",
    image: "/images/part-engine.jpg",
    text: "The heart. It turns fuel into motion, and everything else depends on it.",
    fits: ["Two-wheelers", "Three-wheelers", "Cars"],
  },
  {
    id: "brakes",
    index: "02",
    name: "BRAKES",
    bangla: "ব্রেক",
    image: "/images/part-brakes.jpg",
    text: "Going fast is easy. Stopping on time is the part that keeps you safe.",
    fits: ["Two-wheelers", "Three-wheelers", "Cars"],
  },
  {
    id: "tyres",
    index: "03",
    name: "TYRES",
    bangla: "টায়ার",
    image: "/images/part-tyres.jpg",
    text: "The only part that touches the road. Grip, comfort and safety start here.",
    fits: ["Two-wheelers", "Three-wheelers", "Cars"],
  },
  {
    id: "suspension",
    index: "04",
    name: "SUSPENSION",
    bangla: "সাসপেনশন",
    image: "/images/part-suspension.jpg",
    text: "Absorbs every bump so the ride stays steady, even on a broken road.",
    fits: ["Two-wheelers", "Cars"],
  },
  {
    id: "battery",
    index: "05",
    name: "BATTERY",
    bangla: "ব্যাটারি",
    image: "/images/part-battery.jpg",
    text: "Starts the engine and powers the lights, horn and electronics.",
    fits: ["Two-wheelers", "Three-wheelers", "Cars"],
  },
  {
    id: "lights",
    index: "06",
    name: "LIGHTS",
    bangla: "লাইট",
    image: "/images/part-lights.jpg",
    text: "See and be seen. Headlights turn a dark road into a safe one.",
    fits: ["Two-wheelers", "Three-wheelers", "Cars"],
  },
];

export default function Parts() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getDistance(),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // progress bar
        gsap.to(".parts-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getDistance(),
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // image parallax inside each card
        gsap.utils.toArray<HTMLElement>(".part-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".part-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parts"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-bg"
    >
      {/* heading */}
      <div className="absolute left-6 top-24 z-20 md:left-10">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          03 &nbsp;/&nbsp; Parts
        </p>
        <h2 className="mt-2 font-display text-5xl leading-none md:text-7xl">
          THE PARTS THAT
          <br />
          KEEP YOU MOVING
        </h2>
      </div>

      {/* track */}
      <div
        ref={trackRef}
        className="flex h-full items-end gap-6 px-6 pb-16 pt-56 will-change-transform md:gap-10 md:px-10 md:pb-20"
        style={{ width: "max-content" }}
      >
        {parts.map((p) => (
          <article
            key={p.id}
            className="part-card relative h-full w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface sm:w-[52vw] md:w-[34vw] lg:w-[28vw]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="part-img absolute -inset-x-[12%] inset-y-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,77,28,0.22),transparent_65%)]" />
                <Image
                  src={p.image}
                  alt={p.name.toLowerCase()}
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-xs uppercase tracking-[0.3em]">
              <span className="text-accent">{p.index}</span>
              <span className="text-fg/60">{p.bangla}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <h3 className="font-display text-5xl leading-none tracking-tight md:text-6xl">
                {p.name}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg/75">
                {p.text}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.fits.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-fg/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* end spacer card */}
        <div className="flex h-full w-[40vw] shrink-0 items-center md:w-[22vw]">
          <a
            href="#stats"
            className="font-display text-5xl leading-none text-accent md:text-6xl"
          >
            AND MORE →
          </a>
        </div>
      </div>

      {/* progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/10">
        <div className="parts-bar h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}