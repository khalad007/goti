"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;
const lines = ["BUILT TO", "MOVE."];
const categories = ["Two-Wheelers", "Three-Wheelers", "Cars", "Parts"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener("goti:ready", onReady);
    return () => window.removeEventListener("goti:ready", onReady);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-bg"
    >
      {/* background media */}
      <motion.div
        style={{ y: mediaY }}
        className="absolute inset-0 scale-110"
      >
        {/* fallback glow if there is no video yet */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(255,77,28,0.25),transparent_60%)]" />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* overlays: darken + fade into next section */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />

      {/* content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-28 md:px-10 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-accent"
        >
          গতি &nbsp;/&nbsp; Motion, engineered
        </motion.p>

        <h1 className="font-display text-[22vw] leading-[0.85] tracking-tight md:text-[15vw]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={ready ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                className={`block ${i === 1 ? "text-accent" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-sm leading-relaxed text-fg/70 md:text-base">
            {site.description} A closer look at the machines that move
            millions, and the parts that keep them alive.
          </p>

          <a
            href="#categories"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-accent px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-105"
          >
            Explore
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </motion.div>

      {/* bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-muted md:px-10"
      >
        <ul className="flex gap-4 md:gap-8">
          {categories.map((c) => (
            <li key={c} className="hidden first:block sm:block">
              {c}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-white/20">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}