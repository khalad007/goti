import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Categories from "@/components/sections/Categories";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Manifesto />
      <Categories />

      <section
        id="parts"
        className="flex h-screen items-center justify-center border-t border-line"
      >
        <p className="font-display text-[12vw] leading-none text-accent">
          PARTS
        </p>
      </section>

      <section
        id="stats"
        className="flex h-screen items-center justify-center border-t border-line bg-surface"
      >
        <p className="font-display text-[12vw] leading-none">NUMBERS</p>
      </section>

      <section
        id="contact"
        className="flex h-screen items-center justify-center border-t border-line"
      >
        <p className="font-display text-[12vw] leading-none text-accent">
          CONTACT
        </p>
      </section>
    </main>
  );
}