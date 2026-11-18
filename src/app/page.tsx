import Hero from "@/components/sections/Hero";
<<<<<<< HEAD
import Manifesto from "@/components/sections/Manifesto";
=======
>>>>>>> 86860d7a688811f4c24dc5ae946911ff732224b3

export default function Home() {
  return (
    <main id="top">
      <Hero />
<<<<<<< HEAD
      <Manifesto />
=======
>>>>>>> 86860d7a688811f4c24dc5ae946911ff732224b3

      <section
        id="categories"
        className="flex h-screen items-center justify-center border-t border-line bg-surface"
      >
        <p className="font-display text-[12vw] leading-none">CATEGORIES</p>
      </section>

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