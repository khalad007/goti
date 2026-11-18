"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => setVisible(false), 250);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => window.dispatchEvent(new Event("goti:ready"))}
    >
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 md:p-10"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted">
            <span>{site.tagline}</span>
            <span>গতি</span>
          </div>

          <div className="flex items-end justify-between">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[22vw] leading-[0.8] tracking-tight text-fg"
            >
              {site.name}
            </motion.h1>

            <span className="font-display text-[14vw] leading-[0.8] tabular-nums text-accent md:text-[10vw]">
              {count}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-line">
            <div
              className="h-full bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}