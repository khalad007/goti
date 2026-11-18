"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

const links = [
  { label: "Categories", href: "#categories" },
  { label: "Parts", href: "#parts" },
  { label: "Numbers", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener("goti:ready", onReady);
    return () => window.removeEventListener("goti:ready", onReady);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 40);
    setHidden(latest > prev && latest > 150);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={
          ready
            ? { y: hidden && !open ? -100 : 0, opacity: 1 }
            : { y: -100, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
          atTop && !open
            ? "bg-transparent"
            : "bg-bg/70 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-3xl leading-none tracking-wide"
          >
            {site.name}
            <span className="text-accent">.</span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-accent px-5 py-2 text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-black md:inline-block"
          >
            Get in touch
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[90] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-[2px] w-7 bg-fg transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-7 bg-fg transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-bg px-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-7xl leading-[1.05] transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-10 text-xs uppercase tracking-[0.35em] text-muted">
              {site.tagline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}