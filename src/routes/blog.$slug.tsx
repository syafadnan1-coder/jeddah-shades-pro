import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { articleQuery } from "@/lib/queries";
import { HERO_IMAGE } from "@/lib/content";
import { SmartImage } from "@/components/site/SmartImage";
import { CTAButtons } from "@/components/site/CTAButtons";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "المقال غير متاح" }, { name: "robots", content: "noindex" }] };
    }
    const title = loaderData.seo_title ?? `${loaderData.title} | الخبراء التظليل`;
    const desc = loaderData.seo_description ?? loaderData.excerpt ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: desc,
            datePublished: loaderData.published_at,
            inLanguage: "ar",
            author: { "@type": "Organization", name: "الخبراء التظليل" },
          }),
        },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-2xl font-extrabold">المقال غير موجود</h1>
      <Link to="/blog" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
        العودة للمدونة
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article } = useSuspenseQuery(articleQuery(slug));
  if (!article) return <ArticleNotFound />;

  return (
    <article className="section-y">
      <div className="container-site max-w-3xl">
        <nav aria-label="مسار التنقل" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">الرئيسية</Link>
          <span className="px-2">/</span>
          <Link to="/blog" className="hover:text-foreground">المدونة</Link>
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground">{article.title}</h1>
        {article.published_at && (
          <p className="mt-3 text-xs text-muted-foreground">
            {new Date(article.published_at).toLocaleDateString("ar-SA")}
          </p>
        )}
        <SmartImage
          src={article.featured_image}
          fallback={HERO_IMAGE}
          alt={article.alt_text ?? article.title}
          className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
        />
        <div className="prose-ar mt-8">
          {(article.content ?? article.excerpt ?? "").split("\n").filter(Boolean).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-secondary p-8 text-center">
          <h2 className="text-xl font-extrabold">تحتاج استشارة أو عرض سعر؟</h2>
          <p className="mt-2 text-sm text-muted-foreground">فريقنا جاهز لخدمتك في جميع أحياء جدة.</p>
          <CTAButtons className="mt-6 justify-center" />
        </div>
      </div>
    </article>
  );
}
