import { site } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <section className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="font-display text-[20vw] leading-none tracking-tight text-accent">
          {site.name}
        </h1>
        <p className="text-sm uppercase tracking-[0.4em] text-muted">
          {site.tagline}
        </p>
      </section>

      <section className="flex h-screen items-center justify-center border-t border-line bg-surface">
        <p className="font-display text-[12vw] leading-none">SCROLL TEST</p>
      </section>

      <section className="flex h-screen items-center justify-center border-t border-line">
        <p className="font-display text-[12vw] leading-none text-accent">
          SMOOTH?
        </p>
      </section>
    </main>
  );
}