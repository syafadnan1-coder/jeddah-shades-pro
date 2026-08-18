import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { JEDDAH_DISTRICTS } from "@/lib/site";
import { SERVICES_CONTENT } from "@/lib/content";

export function LeadForm({ defaultService }: { defaultService?: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    if (name.length < 2) return toast.error("الرجاء إدخال الاسم");
    if (!/^[0-9+\s-]{9,15}$/.test(phone)) return toast.error("الرجاء إدخال رقم جوال صحيح");

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      district: String(fd.get("district") ?? "") || null,
      service: String(fd.get("service") ?? "") || null,
      message: String(fd.get("message") ?? "") || null,
    });
    setLoading(false);
    if (error) {
      toast.error("تعذّر إرسال الطلب، حاول مرة أخرى أو تواصل عبر واتساب");
      return;
    }
    form.reset();
    setDone(true);
    toast.success("تم استلام طلبك، سنتواصل معك خلال وقت قصير");
  }

  const field =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25";

  if (done) {
    return (
      <div className="card-soft p-8 text-center">
        <h3 className="text-lg font-bold text-foreground">تم استلام طلبك بنجاح</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتواصل معك فريق المبيعات لتحديد موعد المعاينة وتقديم عرض السعر.
        </p>
        <button onClick={() => setDone(false)} className="mt-5 text-sm font-bold text-primary underline">
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-soft grid gap-4 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold">الاسم</label>
          <input id="name" name="name" required className={field} placeholder="الاسم الكامل" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-bold">رقم الجوال</label>
          <input id="phone" name="phone" required inputMode="tel" className={field} placeholder="05xxxxxxxx" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-bold">الخدمة المطلوبة</label>
          <select id="service" name="service" defaultValue={defaultService ?? ""} className={field}>
            <option value="">اختر الخدمة</option>
            {SERVICES_CONTENT.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="district" className="mb-1.5 block text-sm font-bold">الحي</label>
          <select id="district" name="district" className={field}>
            <option value="">اختر الحي</option>
            {JEDDAH_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold">تفاصيل الطلب (اختياري)</label>
        <textarea id="message" name="message" rows={4} className={field} placeholder="المساحة التقريبية، نوع التصميم المطلوب..." />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "جارٍ الإرسال..." : "أرسل الطلب واحصل على عرض سعر"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        بياناتك محفوظة ولا تُستخدم إلا للتواصل بخصوص طلبك.
      </p>
    </form>
  );
}
