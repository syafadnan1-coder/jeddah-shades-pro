import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { galleryQuery } from "@/lib/queries";
import { HERO_IMAGE, SERVICE_IMAGES } from "@/lib/content";
import { SmartImage } from "@/components/site/SmartImage";
import { SectionHeading } from "@/components/site/Sections";
import { CTAButtons } from "@/components/site/CTAButtons";

const TITLE = "معرض أعمالنا | مشاريع مظلات وسواتر في جدة | الخبراء التظليل";
const DESC =
  "تصفح معرض أعمال الخبراء التظليل في جدة: مظلات سيارات، سواتر، بيوت شعر، برجولات، هناجر ومشاريع سندوتش بانل منفذة بالكامل.";

export const Route = createFileRoute("/our-work")({
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/our-work" },
    ],
    links: [{ rel: "canonical", href: "/our-work" }],
  }),
  component: OurWork,
});

function OurWork() {
  const { data } = useSuspenseQuery(galleryQuery);
  const [active, setActive] = useState<string>("all");

  const images = data.images;
  const projects = data.projects;
  const filtered =
    active === "all" ? projects : projects.filter((p) => p.slug.includes(active) || p.title.includes(active));

  return (
    <>
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-site">
          <h1 className="text-3xl font-extrabold md:text-4xl">معرض أعمالنا في جدة</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-primary-foreground/80">
            نماذج حقيقية من مشاريع نفذها فريق الخبراء التظليل في مختلف أحياء جدة، من مظلات الفلل إلى الهناجر الصناعية.
          </p>
          <CTAButtons className="mt-7" variant="onDark" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive("all")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === "all" ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`}
            >
              الكل
            </button>
            {data.categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.slug)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === c.slug ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 && images.length === 0 ? (
            <div className="mx-auto max-w-xl text-center">
              <SectionHeading
                title="سيتم إضافة صور المشاريع قريباً"
                subtitle="يمكن لفريق الإدارة رفع صور الأعمال من لوحة التحكم لتظهر هنا مباشرة."
              />
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {Object.entries(SERVICE_IMAGES).slice(0, 4).map(([slug, img]) => (
                  <img key={slug} src={img} alt={`نموذج عمل ${slug}`} loading="lazy" className="h-44 w-full rounded-2xl object-cover" />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article key={p.id} className="card-soft overflow-hidden">
                  <SmartImage src={p.featured_image} fallback={HERO_IMAGE} alt={p.title} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <h2 className="text-base font-bold">{p.title}</h2>
                    {p.location && <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>}
                    {p.description && <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{p.description}</p>}
                  </div>
                </article>
              ))}
              {images.map((img) => (
                <figure key={img.id} className="card-soft overflow-hidden">
                  <SmartImage src={img.image_url} alt={img.alt_text ?? "صورة مشروع"} className="h-52 w-full object-cover" />
                  {img.caption && <figcaption className="p-4 text-sm text-muted-foreground">{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
