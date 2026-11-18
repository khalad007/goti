"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

const EMAIL = "hello@goti.example";
const marquee = ["TWO-WHEELERS", "THREE-WHEELERS", "CARS", "PARTS", "গতি"];
const interests = ["Two-wheeler", "Three-wheeler", "Car", "Parts"];

const details = [
  { label: "Email", value: EMAIL },
  { label: "Phone", value: "+880 1XXX-XXXXXX" },
  { label: "Based in", value: "Dhaka, Bangladesh" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const toggle = (item: string) =>
    setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `GOTI enquiry from ${name || "website"}`;
    const body = [
      `Name: ${name}`,
      `Reply to: ${contact}`,
      `Interested in: ${picked.length ? picked.join(", ") : "Not specified"}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const items = [...marquee, ...marquee];

  const field =
    "w-full border-b border-white/20 bg-transparent py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-accent";

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full overflow-hidden border-t border-line bg-bg"
    >
      {/* background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[10%] inset-x-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,77,28,0.28),transparent_60%)]" />
        <Image
          src="/images/contacttwo.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative grid gap-14 px-6 pb-20 pt-28 md:px-10 md:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* left: headline + details */}
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-accent">
            05 &nbsp;/&nbsp; Contact
          </p>

          <h2 className="font-display text-[18vw] leading-[0.85] tracking-tight sm:text-[14vw] lg:text-[8.5vw]">
            {["LET'S KEEP", "IT MOVING."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
                  className={`block ${i === 1 ? "text-accent" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-8 max-w-md text-sm leading-relaxed text-fg/70 md:text-base"
          >
            Got a workshop, a spare-parts shop or a project in mind? Tell us
            what you need and we&apos;ll get back to you.
          </motion.p>

          <ul className="mt-10 space-y-5 border-t border-white/10 pt-8">
            {details.map((d, i) => (
              <motion.li
                key={d.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: EASE }}
                className="flex items-baseline gap-6"
              >
                <span className="w-24 shrink-0 text-[11px] uppercase tracking-[0.3em] text-muted">
                  {d.label}
                </span>
                <span className="font-display text-2xl leading-none md:text-3xl">
                  {d.value}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* right: form card */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="self-start rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl md:p-8"
        >
          <p className="font-display text-3xl leading-none md:text-4xl">
            START A CONVERSATION
          </p>

          <div className="mt-8 space-y-6">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              className={field}
            />
            <input
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone"
              aria-label="Email or phone"
              className={field}
            />

            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted">
                I&apos;m interested in
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((t) => {
                  const on = picked.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(t)}
                      className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        on
                          ? "border-accent bg-accent text-black"
                          : "border-white/25 text-fg/80 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project"
              aria-label="Message"
              className={`${field} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            Send message
            <span aria-hidden>→</span>
          </button>
        </motion.form>
      </div>

      {/* marquee */}
      <div className="relative overflow-hidden border-y border-white/10 bg-black/30 py-5 backdrop-blur-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-10 whitespace-nowrap"
        >
          {items.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-5xl leading-none text-fg/20 md:text-7xl"
            >
              {t}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}