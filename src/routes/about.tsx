import { createFileRoute } from "@tanstack/react-router";
import { Award, HardHat, ShieldCheck, Users } from "lucide-react";
import { SITE } from "@/lib/site";
import { HERO_IMAGE } from "@/lib/content";
import { CTAButtons } from "@/components/site/CTAButtons";
import { SectionHeading, StepsSection } from "@/components/site/Sections";

const TITLE = "من نحن | شركة الخبراء التظليل للمظلات والسواتر في جدة";
const DESC =
  "تعرّف على شركة الخبراء التظليل في جدة: خبرة تتجاوز 15 عاماً في تصميم وتركيب المظلات والسواتر والهناجر بخامات معتمدة وفريق فني محترف.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, title: "الجودة أولاً", text: "لا نستخدم إلا خامات معتمدة تتحمل مناخ جدة الحار والرطب." },
  { icon: Users, title: "شفافية كاملة", text: "عرض سعر مفصل وواضح قبل بدء التنفيذ دون مفاجآت." },
  { icon: HardHat, title: "احترافية التنفيذ", text: "فرق فنية مدربة تلتزم بمعايير السلامة ونظافة الموقع." },
  { icon: Award, title: "ما بعد البيع", text: "متابعة وضمان وصيانة سريعة لأي ملاحظة بعد التسليم." },
];

function About() {
  return (
    <>
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">من نحن — {SITE.name}</h1>
            <p className="mt-4 text-base leading-8 text-primary-foreground/80">
              شركة سعودية متخصصة في حلول التظليل والسواتر والمنشآت المعدنية، انطلقنا من جدة قبل أكثر من 15 عاماً
              ونفذنا مئات المشاريع السكنية والتجارية والصناعية بجودة ثابتة والتزام بالمواعيد.
            </p>
            <CTAButtons className="mt-7" variant="onDark" />
          </div>
          <img src={HERO_IMAGE} alt="مشاريع الخبراء التظليل في جدة" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading eyebrow="قيمنا" title="مبادئ نلتزم بها في كل مشروع" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card-soft p-6">
                <v.icon className="size-7 text-primary" aria-hidden />
                <h2 className="mt-4 text-base font-bold">{v.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="container-site">
          <SectionHeading eyebrow="آلية العمل" title="كيف نعمل معك" />
          <div className="mt-12">
            <StepsSection
              steps={[
                { title: "المعاينة", text: "زيارة مجانية للموقع في أي حي بجدة وأخذ المقاسات." },
                { title: "التصميم والعرض", text: "تصور تصميمي وعرض سعر مفصل وواضح." },
                { title: "التصنيع", text: "تصنيع دقيق في الورشة بخامات معتمدة." },
                { title: "التركيب والضمان", text: "تركيب احترافي وتسليم نظيف مع ضمان كتابي." },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
