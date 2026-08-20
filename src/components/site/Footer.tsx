import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { SITE, telHref, waHref, JEDDAH_DISTRICTS } from "@/lib/site";
import { SERVICES_CONTENT } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-extrabold">{SITE.name}</h2>
          <p className="mt-3 text-sm leading-7 text-primary-foreground/75">
            شركة متخصصة في تصميم وتركيب مظلات السيارات والسواتر وبيوت الشعر والبرجولات والهناجر في
            {" "}جدة، بخبرة تتجاوز 15 عاماً وخامات معتمدة وضمان حقيقي.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white"
            >
              <MessageCircle className="size-4" aria-hidden /> واتساب
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-bold"
            >
              <Phone className="size-4" aria-hidden /> اتصال
            </a>
          </div>
        </div>

        <nav aria-label="خدماتنا">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">خدماتنا</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES_CONTENT.map((s) => (
              <li key={s.slug}>
                <Link to={s.href} className="text-primary-foreground/85 transition hover:text-primary-foreground">
                  {s.name} في جدة
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="روابط مهمة">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">روابط مهمة</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/our-work" className="text-primary-foreground/85 hover:text-primary-foreground">معرض الأعمال</Link></li>
            <li><Link to="/about" className="text-primary-foreground/85 hover:text-primary-foreground">من نحن</Link></li>
            <li><Link to="/blog" className="text-primary-foreground/85 hover:text-primary-foreground">المدونة</Link></li>
            <li><Link to="/contact" className="text-primary-foreground/85 hover:text-primary-foreground">تواصل معنا</Link></li>
            <li><Link to="/auth" className="text-primary-foreground/60 hover:text-primary-foreground">دخول الإدارة</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">بيانات التواصل</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 size-4 shrink-0" aria-hidden /> {SITE.phone.replace("966", "0")}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden /> {SITE.area}</li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 size-4 shrink-0" aria-hidden /> {SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-6">
          <h2 className="text-xs font-bold text-primary-foreground/70">نخدم جميع أحياء جدة</h2>
          <p className="mt-2 text-xs leading-6 text-primary-foreground/55">
            {JEDDAH_DISTRICTS.join(" • ")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-5 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {SITE.name} — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
