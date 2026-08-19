import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { LeadForm } from "@/components/site/LeadForm";
import { CTAButtons } from "@/components/site/CTAButtons";

const TITLE = "تواصل معنا | الخبراء التظليل للمظلات والسواتر في جدة";
const DESC =
  "تواصل مع الخبراء التظليل في جدة عبر الهاتف أو واتساب أو نموذج طلب عرض السعر. معاينة مجانية في جميع أحياء جدة.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="section-y">
      <div className="container-site grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">تواصل مع الخبراء التظليل</h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            نستقبل طلباتكم يومياً ونوفر معاينة مجانية في جميع أحياء جدة مع عرض سعر واضح خلال وقت قصير.
          </p>
          <CTAButtons className="mt-7" />
          <ul className="mt-10 grid gap-4">
            <li className="card-soft flex items-start gap-3 p-5">
              <Phone className="mt-1 size-5 text-primary" aria-hidden />
              <div>
                <h2 className="text-sm font-bold">الهاتف والواتساب</h2>
                <p className="mt-1 text-sm text-muted-foreground" dir="ltr">+{SITE.phone}</p>
              </div>
            </li>
            <li className="card-soft flex items-start gap-3 p-5">
              <MapPin className="mt-1 size-5 text-primary" aria-hidden />
              <div>
                <h2 className="text-sm font-bold">نطاق الخدمة</h2>
                <p className="mt-1 text-sm text-muted-foreground">{SITE.area}</p>
              </div>
            </li>
            <li className="card-soft flex items-start gap-3 p-5">
              <Clock className="mt-1 size-5 text-primary" aria-hidden />
              <div>
                <h2 className="text-sm font-bold">ساعات العمل</h2>
                <p className="mt-1 text-sm text-muted-foreground">{SITE.hours}</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-extrabold">أرسل طلبك</h2>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
