import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { SERVICES_CONTENT } from "@/lib/content";
import { siteQuery } from "@/lib/queries";
import { JEDDAH_DISTRICTS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <As className="mt-4 text-2xl font-extrabold text-foreground md:text-3xl">{title}</As>
      {subtitle && <p className="mt-3 text-base leading-8 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function ServicesGrid({ currentSlug }: { currentSlug?: string }) {
  const items = SERVICES_CONTENT.filter((s) => s.slug !== currentSlug);
  const { data: site } = useQuery(siteQuery);
  const bySlug = new Map((site?.services ?? []).map((s) => [s.slug, s]));
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const db = bySlug.get(s.slug);
        return (
        <Link
          key={s.slug}
          to={`/${s.slug}` as "/car-shades-jeddah"}
          className="card-soft group overflow-hidden transition hover:shadow-lift"
        >
          <SmartImage
            src={db?.featured_image}
            fallback={s.image}
            alt={`${db?.name ?? s.name} في جدة`}
            width={1280}
            height={900}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground">{db?.name ?? s.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">{db?.short_description || s.intro[0]}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
              تفاصيل الخدمة <ChevronLeft className="size-4" aria-hidden />
            </span>
          </div>
        </Link>
        );
      })}
    </div>
  );
}

export function FaqList({ items }: { items: { id: string; question: string; answer: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((f) => (
        <details key={f.id} className="group px-6 py-4">
          <summary className="cursor-pointer list-none text-base font-bold text-foreground marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {f.question}
              <ChevronLeft className="size-5 shrink-0 text-muted-foreground transition group-open:-rotate-90" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function DistrictsSection({ serviceName }: { serviceName: string }) {
  return (
    <section className="section-y bg-secondary/60">
      <div className="container-site">
        <SectionHeading
          eyebrow="تغطية محلية"
          title={`${serviceName} في جميع أحياء جدة`}
          subtitle="فريقنا يصل إليك في أي حي داخل جدة خلال 24 ساعة للمعاينة المجانية وتقديم عرض السعر."
        />
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {JEDDAH_DISTRICTS.map((d) => (
            <li
              key={d}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              {serviceName} {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StepsSection({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div key={s.title} className="card-soft p-6">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
            {i + 1}
          </span>
          <h3 className="mt-4 text-base font-bold text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
