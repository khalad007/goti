import { site } from "@/lib/site";

const links = [
  { label: "Categories", href: "#categories" },
  { label: "Parts", href: "#parts" },
  { label: "Numbers", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg px-6 pb-6 pt-16 md:px-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-4xl leading-none">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.description}</p>
        </div>

        <ul className="flex flex-wrap gap-x-10 gap-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#top"
          className="text-sm uppercase tracking-[0.2em] text-fg transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </div>

      {/* giant wordmark */}
      <p
        aria-hidden
        className="mt-12 select-none text-center font-display text-[34vw] leading-[0.75] tracking-tight text-fg/[0.06]"
      >
        {site.name}
      </p>

      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-[11px] uppercase tracking-[0.25em] text-muted sm:flex-row sm:justify-between">
        <span>
          © {site.year} {site.name}. All rights reserved.
        </span>
        <span>{site.tagline}</span>
      </div>
    </footer>
  );
}
