import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { articlesQuery } from "@/lib/queries";
import { HERO_IMAGE } from "@/lib/content";
import { SmartImage } from "@/components/site/SmartImage";

const TITLE = "المدونة | نصائح ومقالات عن المظلات والسواتر في جدة";
const DESC =
  "مقالات ونصائح من الخبراء التظليل حول اختيار مظلات السيارات والسواتر وبيوت الشعر والسندوتش بانل في جدة، وأفضل الخامات والأسعار.";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(articlesQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: articles } = useSuspenseQuery(articlesQuery);

  return (
    <>
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-site">
          <h1 className="text-3xl font-extrabold md:text-4xl">مدونة الخبراء التظليل</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-primary-foreground/80">
            دليلك لاختيار المظلة أو الساتر المناسب في جدة: أنواع، خامات، أسعار، ونصائح صيانة.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          {articles.length === 0 ? (
            <p className="text-center text-muted-foreground">لا توجد مقالات منشورة حالياً.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="card-soft overflow-hidden transition hover:shadow-lift"
                >
                  <SmartImage src={a.featured_image} fallback={HERO_IMAGE} alt={a.title} className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <h2 className="text-base font-bold">{a.title}</h2>
                    {a.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
