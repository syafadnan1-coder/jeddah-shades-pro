import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { servicePageQuery } from "@/lib/queries";
import type { ServiceContent } from "@/lib/content";
import { CTAButtons } from "./CTAButtons";
import { LeadForm } from "./LeadForm";
import { SmartImage } from "./SmartImage";
import { DistrictsSection, FaqList, SectionHeading, ServicesGrid, StepsSection } from "./Sections";

export function ServicePage({ content }: { content: ServiceContent }) {
  const { data } = useSuspenseQuery(servicePageQuery(content.slug));
  const types = data.types;
  const faqs = data.faqs;
  const projects = data.projects;
  const waMsg = `السلام عليكم، أرغب بعرض سعر لخدمة ${content.name} في جدة`;

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <nav aria-label="مسار التنقل" className="text-xs text-primary-foreground/60">
              <Link to="/" className="hover:text-primary-foreground">الرئيسية</Link>
              <span className="px-2">/</span>
              <span>{content.name}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{content.h1}</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-primary-foreground/80">{content.intro[0]}</p>
            <CTAButtons className="mt-7" message={waMsg} variant="onDark" />
          </div>
          <SmartImage
            src={data.service?.featured_image ?? null}
            fallback={content.image}
            alt={`${content.h1} - ${content.name}`}
            eager
            width={1280}
            height={900}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading
              center={false}
              eyebrow="نبذة عن الخدمة"
              title={`لماذا تختار ${content.name} من الخبراء التظليل؟`}
            />
            <div className="prose-ar mt-5 max-w-none">
              {content.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {content.benefits.map((b) => (
                <div key={b.title} className="card-soft p-5">
                  <ShieldCheck className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-3 text-base font-bold">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-extrabold">احصل على عرض سعر مجاني</h2>
            <LeadForm defaultService={content.name} />
          </div>
        </div>
      </section>

      {types.length > 0 && (
        <section className="section-y bg-secondary/60">
          <div className="container-site">
            <SectionHeading
              eyebrow="الأنواع والتصاميم"
              title={`أنواع ${content.name} التي ننفذها في جدة`}
              subtitle="نصمم كل نوع بمقاسات وخامات تناسب موقعك وميزانيتك."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {types.map((t) => (
                <article key={t.id} className="card-soft p-6">
                  <Sparkles className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-3 text-base font-bold">{t.name}</h3>
                  {t.image_url && (
                    <SmartImage
                      src={t.image_url}
                      alt={`${t.name} في جدة`}
                      className="mt-3 h-40 w-full rounded-xl object-cover"
                      width={800}
                      height={600}
                    />
                  )}
                  {t.description && (
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{t.description}</p>
                  )}
                  {t.features && t.features.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="card-soft p-7">
            <h2 className="text-xl font-extrabold">الخامات المستخدمة</h2>
            <ul className="mt-4 grid gap-2.5">
              {content.materials.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary" aria-hidden /> {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-soft p-7">
            <h2 className="text-xl font-extrabold">أبرز الاستخدامات</h2>
            <ul className="mt-4 grid gap-2.5">
              {content.uses.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary" aria-hidden /> {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="container-site">
          <SectionHeading eyebrow="آلية العمل" title="كيف ننفذ مشروعك خطوة بخطوة" />
          <div className="mt-10">
            <StepsSection steps={content.steps} />
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section-y">
          <div className="container-site">
            <SectionHeading eyebrow="من أعمالنا" title={`مشاريع ${content.name} المنفذة في جدة`} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article key={p.id} className="card-soft overflow-hidden">
                  <SmartImage
                    src={p.featured_image}
                    fallback={content.image}
                    alt={p.title}
                    className="h-48 w-full object-cover"
                    width={1280}
                    height={900}
                  />
                  <div className="p-5">
                    <h3 className="text-base font-bold">{p.title}</h3>
                    {p.location && <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="section-y">
          <div className="container-site">
            <SectionHeading eyebrow="أسئلة شائعة" title={`أسئلة متكررة حول ${content.name}`} />
            <div className="mt-10">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>
      )}

      <DistrictsSection serviceName={content.name} />

      <section className="section-y">
        <div className="container-site">
          <SectionHeading eyebrow="خدمات أخرى" title="تصفح باقي خدماتنا في جدة" />
          <div className="mt-10">
            <ServicesGrid currentSlug={content.slug} />
          </div>
        </div>
      </section>
    </>
  );
}
