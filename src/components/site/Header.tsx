import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { SITE, telHref } from "@/lib/site";
import { SERVICES_CONTENT } from "@/lib/content";

const links = [
  { label: "الرئيسية", href: "/" },
  ...SERVICES_CONTENT.map((s) => ({ label: s.name, href: `/${s.slug}` })),
  { label: "أعمالنا", href: "/our-work" },
  { label: "من نحن", href: "/about" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
            خ ت
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-foreground">{SITE.name}</span>
            <span className="block text-[11px] text-muted-foreground">{SITE.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="القائمة الرئيسية">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: l.href === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            اتصل بنا
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="فتح القائمة"
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-card xl:hidden" aria-label="قائمة الجوال">
          <div className="container-site grid gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
