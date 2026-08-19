import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Award, Clock, HardHat, ShieldCheck, Star, Wrench } from "lucide-react";
import { homeQuery } from "@/lib/queries";
import { HERO_IMAGE, SERVICES_CONTENT } from "@/lib/content";
import { SITE } from "@/lib/site";
import { CTAButtons } from "@/components/site/CTAButtons";
import { LeadForm } from "@/components/site/LeadForm";
import { SmartImage } from "@/components/site/SmartImage";
import {
  DistrictsSection,
  FaqList,
  SectionHeading,
  ServicesGrid,
  StepsSection,
} from "@/components/site/Sections";

const TITLE = "الخبراء التظليل | مظلات سيارات وسواتر وبيوت شعر في جدة";
const DESC =
  "شركة الخبراء التظليل في جدة متخصصة في تركيب مظلات السيارات والسواتر وبيوت الشعر والبرجولات والهناجر والسندوتش بانل. خامات معتمدة، تنفيذ سريع، وضمان. اتصل الآن.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          inLanguage: "ar",
        }),
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Award, title: "خبرة أكثر من 15 عاماً", text: "مئات المشاريع المنفذة في جدة للقطاعين السكني والتجاري." },
  { icon: ShieldCheck, title: "ضمان كتابي", text: "ضمان على الهيكل والتركيب مع صيانة سريعة عند الحاجة." },
  { icon: HardHat, title: "فريق فني محترف", text: "فنيون متخصصون في التصنيع والتركيب وفق معايير السلامة." },
  { icon: Wrench, title: "خامات معتمدة", text: "حديد مجلفن وأقمشة PVDF وألواح معزولة أصلية." },
  { icon: Clock, title: "تنفيذ سريع", text: "معاينة خلال 24 ساعة والتزام كامل بمواعيد التسليم." },
  { icon: Star, title: "أسعار تنافسية", text: "عرض سعر واضح ومفصل بدون أي رسوم مخفية." },
];

function Home() {
  const { data } = useSuspenseQuery(homeQuery);

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={HERO_IMAGE}
          alt="مظلات سيارات حديثة أمام فيلا في جدة"
          width={1280}
          height={900}
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="container-site relative grid gap-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold">
              نخدم جميع أحياء جدة • معاينة مجانية
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.25] md:text-5xl">
              مظلات سيارات وسواتر حديثة في جدة بجودة تدوم سنوات
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/85 md:text-lg">
              الخبراء التظليل تصمم وتنفذ مظلات السيارات، السواتر، بيوت الشعر الملكية، البرجولات، الهناجر
              والسندوتش بانل بخامات معتمدة مقاومة لحرارة ورطوبة جدة، مع ضمان حقيقي وأسعار تنافسية.
            </p>
            <CTAButtons className="mt-8" variant="onDark" />
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["+15", "سنة خبرة"],
                ["+1200", "مشروع منفذ"],
                ["24h", "سرعة المعاينة"],
                ["100%", "رضا العملاء"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-black">{v}</dt>
                  <dd className="text-xs text-primary-foreground/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="خدماتنا"
            title="حلول تظليل وسواتر متكاملة في جدة"
            subtitle="اختر الخدمة المناسبة لمشروعك واحصل على عرض سعر خلال دقائق."
          />
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="container-site">
          <SectionHeading eyebrow="لماذا نحن" title="أسباب تجعل الخبراء التظليل اختيارك الأول" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-soft p-6">
                <f.icon className="size-7 text-primary" aria-hidden />
                <h3 className="mt-4 text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading eyebrow="آلية العمل" title="من المعاينة حتى التسليم في 4 خطوات" />
          <div className="mt-12">
            <StepsSection steps={SERVICES_CONTENT[0]!.steps} />
          </div>
        </div>
      </section>

      {data.projects.length > 0 && (
        <section className="section-y bg-secondary/60">
          <div className="container-site">
            <SectionHeading eyebrow="معرض الأعمال" title="أحدث مشاريعنا في جدة" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((p) => (
                <article key={p.id} className="card-soft overflow-hidden">
                  <SmartImage
                    src={p.featured_image}
                    fallback={HERO_IMAGE}
                    alt={p.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-base font-bold">{p.title}</h3>
                    {p.location && <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/our-work" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
                شاهد كل الأعمال
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-y">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="اطلب الآن"
              title="احصل على عرض سعر مجاني خلال دقائق"
              subtitle="عبّئ النموذج وسيتواصل معك فريقنا لتحديد موعد المعاينة في أي حي داخل جدة."
            />
            <div className="mt-8">
              <CTAButtons />
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {data.faqs.length > 0 && (
        <section className="section-y bg-secondary/60">
          <div className="container-site">
            <SectionHeading eyebrow="أسئلة شائعة" title="إجابات على أكثر أسئلة عملائنا تكراراً" />
            <div className="mt-10">
              <FaqList items={data.faqs} />
            </div>
          </div>
        </section>
      )}

      {data.articles.length > 0 && (
        <section className="section-y">
          <div className="container-site">
            <SectionHeading eyebrow="المدونة" title="مقالات تساعدك على الاختيار الصحيح" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.articles.map((a) => (
                <Link key={a.id} to="/blog/$slug" params={{ slug: a.slug }} className="card-soft p-6 transition hover:shadow-lift">
                  <h3 className="text-base font-bold">{a.title}</h3>
                  {a.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <DistrictsSection serviceName="مظلات وسواتر" />
    </>
  );
}
