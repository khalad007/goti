"use client";

import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";

const EASE = [0.76, 0, 0.24, 1] as const;

const stats = [
  { to: 30000, suffix: "+", label: "Parts in a typical car", note: "Roughly, and every one matters" },
  { to: 3, suffix: "", label: "Vehicle families", note: "Two, three and four wheels" },
  { to: 6, suffix: "", label: "Core parts covered", note: "Engine to lights" },
  { to: 365, suffix: "", label: "Days a year", note: "Machines that never stop" },
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative w-full bg-bg px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mb-14 md:mb-20">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          04 &nbsp;/&nbsp; Numbers
        </p>
        <h2 className="mt-3 overflow-hidden font-display text-5xl leading-none md:text-7xl">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="block"
          >
            MOTION, BY THE NUMBERS
          </motion.span>
        </h2>
      </div>

      <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            className="group relative border-b border-r border-line p-6 transition-colors duration-500 hover:bg-surface md:p-8"
          >
            <p className="font-display text-[22vw] leading-none text-fg transition-colors duration-500 group-hover:text-accent sm:text-[11vw] lg:text-[7vw]">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-fg">
              {s.label}
            </p>
            <p className="mt-1 text-sm text-muted">{s.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}