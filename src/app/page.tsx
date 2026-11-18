import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-[20vw] leading-none tracking-tight text-accent">
        {site.name}
      </h1>
      <p className="text-sm uppercase tracking-[0.4em] text-muted">
        {site.tagline}
      </p>
    </main>
  );
}