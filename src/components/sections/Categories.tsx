"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const categories = [
  {
    id: "two-wheelers",
    index: "01",
    title: "TWO-WHEELERS",
    bangla: "মোটরসাইকেল",
    image: "/images/two-wheeler.jpg",
    text: "Light, quick and everywhere. From the daily commute to the long weekend ride, two wheels carry the most people for the least cost.",
    specs: ["Commuters", "Sport", "Scooters"],
  },
  {
    id: "three-wheelers",
    index: "02",
    title: "THREE-WHEELERS",
    bangla: "অটো ও সিএনজি",
    image: "/images/three-wheeler.jpg",
    text: "The workhorse of every street. Passengers, goods and a whole day's income ride on three wheels and a tough little engine.",
    specs: ["Auto rickshaw", "CNG", "Cargo"],
  },
  {
    id: "cars",
    index: "03",
    title: "CARS",
    bangla: "গাড়ি",
    image: "/images/car.jpg",
    text: "Comfort over distance. Family trips, business runs and late-night drives, with hundreds of parts working together to keep it smooth.",
    specs: ["Sedan", "SUV", "Hatchback"],
  },
];

// timeline length: hold 1, wipe 1, hold 1, wipe 1, hold 1
const TOTAL = 5;

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".cat-panel");
      const imgs = gsap.utils.toArray<HTMLElement>(".cat-img");
      const texts = gsap.utils.toArray<HTMLElement>(".cat-text");

      // starting state for panels 2 and 3
      gsap.set(imgs.slice(1), { scale: 1.3 });
      gsap.set(texts.slice(1), { y: 80, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 4,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * TOTAL;
            const next = t < 1.5 ? 0 : t < 3.5 ? 1 : 2;
            setActive((prev) => (prev === next ? prev : next));
          },
        },
      });

      // global progress line
      tl.to(".cat-bar", { scaleY: 1, duration: TOTAL }, 0);

      for (let i = 1; i < panels.length; i++) {
        const start = i * 2 - 1;

        // new panel wipes up
        tl.to(
          panels[i],
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          start
        );
        // new image settles
        tl.to(imgs[i], { scale: 1, duration: 1 }, start);
        // old image drifts
        tl.to(imgs[i - 1], { scale: 1.15, duration: 1 }, start);
        // new text rises in
        tl.to(
          texts[i],
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          start + 0.3
        );
        // old text fades away
        tl.to(
          texts[i - 1],
          { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" },
          start
        );
      }

      // keep the timeline the full length so the last panel can "hold"
      tl.to({}, { duration: 0 }, TOTAL);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-bg"
    >
      {/* panels */}
      {categories.map((c, i) => (
        <article
          key={c.id}
          className="cat-panel absolute inset-0 overflow-hidden bg-surface"
          style={i === 0 ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <div className="cat-img absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,77,28,0.2),transparent_60%)]" />
            <Image
              src={c.image}
              alt={`${c.title.toLowerCase()} on the road`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

          <div className="cat-text absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent">
              {c.index} &nbsp;/&nbsp; {c.bangla}
            </p>

            <h2 className="font-display text-[16vw] leading-[0.85] tracking-tight sm:text-[13vw] md:text-[11vw]">
              {c.title}
            </h2>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-fg/75 md:text-base">
                {c.text}
              </p>

              <div className="flex flex-wrap items-center gap-3 md:mr-40">
                {c.specs.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg/80"
                  >
                    {s}
                  </span>
                ))}
                <a
                  href="#parts"
                  className="ml-1 text-xs uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
                >
                  See parts →
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* top-left counter (all screens) */}
      <div className="pointer-events-none absolute left-6 top-24 z-20 text-xs uppercase tracking-[0.35em] text-muted md:left-10">
        <span className="text-fg">0{active + 1}</span> / 03
      </div>

      {/* right side index + progress line (desktop) */}
      <div className="pointer-events-none absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 items-stretch gap-5 md:flex">
        <div className="relative w-px bg-white/20">
          <div className="cat-bar absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-accent" />
        </div>
        <ul className="flex flex-col gap-6">
          {categories.map((c, i) => (
            <li
              key={c.id}
              className={`font-display text-2xl leading-none tracking-wide transition-all duration-500 ${
                i === active
                  ? "translate-x-0 text-fg"
                  : "translate-x-2 text-fg/30"
              }`}
            >
              <span className="mr-3 text-xs text-accent">{c.index}</span>
              {c.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}