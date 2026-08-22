/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ResourceManager, type Field } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | الخبراء التظليل" },
      { name: "description", content: "لوحة تحكم إدارة محتوى موقع الخبراء التظليل." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحكم | الخبراء التظليل" },
      { property: "og:description", content: "لوحة تحكم إدارة محتوى موقع الخبراء التظليل." },
    ],
  }),
  component: AdminPage,
});

const TABS = [
  "الخدمات",
  "أنواع الخدمات",
  "المشاريع",
  "صور المشاريع",
  "المقالات",
  "الأسئلة الشائعة",
  "طلبات العملاء",
  "الإعدادات",
] as const;

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]>("الخدمات");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<{ value: string; label: string }[]>([]);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData.user?.email ?? "");
      const { data } = await (supabase as any).rpc("is_admin");
      setIsAdmin(Boolean(data));
      const { data: svc } = await supabase.from("services").select("id,name").order("sort_order");
      setServices((svc ?? []).map((s) => ({ value: s.id, label: s.name })));
      const { data: st } = await supabase.from("site_settings").select("id").limit(1).maybeSingle();
      setSettingsId(st?.id ?? null);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  const serviceField: Field = { key: "service_id", label: "الخدمة", type: "select", options: services };

  return (
    <section className="py-8 md:section-y">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold md:text-2xl">لوحة التحكم</h1>
            <p className="mt-1 truncate text-xs text-muted-foreground md:text-sm">{email}</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold md:px-4 md:text-sm">
            <LogOut className="size-4" aria-hidden /> تسجيل الخروج
          </button>
        </div>

        {isAdmin === false && (
          <div className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm md:p-5">
            حسابك ليس لديه صلاحية مدير بعد. يجب منح دور <strong>admin</strong> لهذا الحساب من قاعدة البيانات
            لتتمكن من التعديل. يمكنك التصفح لكن عمليات الحفظ سترفض.
          </div>
        )}

        <div className="-mx-5 mt-6 overflow-x-auto px-5 md:mx-0 md:mt-8 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition md:px-4 md:text-sm ${tab === t ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>


        <div className="mt-8">
          {tab === "الخدمات" && (
            <ResourceManager
              table="services"
              title="الخدمات"
              orderBy={{ column: "sort_order" }}
              fields={[
                { key: "name", label: "اسم الخدمة", type: "text" },
                { key: "slug", label: "الرابط (slug)", type: "text" },
                { key: "short_description", label: "وصف مختصر", type: "textarea" },
                { key: "description", label: "الوصف الكامل", type: "textarea" },
                { key: "featured_image", label: "الصورة", type: "image", bucket: "services" },
                { key: "seo_title", label: "عنوان SEO", type: "text" },
                { key: "seo_description", label: "وصف SEO", type: "textarea" },
                { key: "sort_order", label: "الترتيب", type: "number" },
                { key: "is_active", label: "مفعّل", type: "boolean" },
              ]}
            />
          )}

          {tab === "أنواع الخدمات" && (
            <ResourceManager
              table="service_types"
              title="أنواع الخدمات"
              orderBy={{ column: "sort_order" }}
              fields={[
                { key: "name", label: "الاسم", type: "text" },
                { key: "slug", label: "الرابط (slug)", type: "text" },
                serviceField,
                { key: "description", label: "الوصف", type: "textarea" },
                { key: "features", label: "المميزات", type: "list" },
                { key: "materials", label: "الخامات", type: "list" },
                { key: "image_url", label: "الصورة", type: "image", bucket: "services" },
                { key: "sort_order", label: "الترتيب", type: "number" },
                { key: "is_active", label: "مفعّل", type: "boolean" },
              ]}
            />
          )}

          {tab === "المشاريع" && (
            <ResourceManager
              table="projects"
              title="المشاريع"
              titleKey="title"
              orderBy={{ column: "created_at", ascending: false }}
              fields={[
                { key: "title", label: "عنوان المشروع", type: "text" },
                { key: "slug", label: "الرابط (slug)", type: "text" },
                serviceField,
                { key: "location", label: "الموقع / الحي", type: "text" },
                { key: "description", label: "الوصف", type: "textarea" },
                { key: "featured_image", label: "الصورة الرئيسية", type: "image", bucket: "projects" },
                { key: "seo_title", label: "عنوان SEO", type: "text" },
                { key: "seo_description", label: "وصف SEO", type: "textarea" },
                { key: "is_featured", label: "مميز", type: "boolean" },
                { key: "is_active", label: "مفعّل", type: "boolean" },
              ]}
            />
          )}

          {tab === "صور المشاريع" && (
            <ResourceManager
              table="project_images"
              title="صور المشاريع"
              titleKey="caption"
              orderBy={{ column: "sort_order" }}
              fields={[
                { key: "image_url", label: "الصورة", type: "image", bucket: "gallery" },
                { key: "caption", label: "التعليق", type: "text" },
                { key: "alt_text", label: "النص البديل (alt)", type: "text" },
                { key: "category", label: "التصنيف", type: "text" },
                { key: "sort_order", label: "الترتيب", type: "number" },
              ]}
            />
          )}

          {tab === "المقالات" && (
            <ResourceManager
              table="articles"
              title="المقالات"
              titleKey="title"
              orderBy={{ column: "created_at", ascending: false }}
              fields={[
                { key: "title", label: "العنوان", type: "text" },
                { key: "slug", label: "الرابط (slug)", type: "text" },
                { key: "excerpt", label: "مقتطف", type: "textarea" },
                { key: "content", label: "المحتوى", type: "textarea" },
                { key: "featured_image", label: "الصورة", type: "image", bucket: "articles" },
                { key: "alt_text", label: "النص البديل (alt)", type: "text" },
                { key: "seo_title", label: "عنوان SEO", type: "text" },
                { key: "seo_description", label: "وصف SEO", type: "textarea" },
                { key: "published", label: "منشور", type: "boolean" },
              ]}
            />
          )}

          {tab === "الأسئلة الشائعة" && (
            <ResourceManager
              table="faqs"
              title="الأسئلة الشائعة"
              titleKey="question"
              orderBy={{ column: "sort_order" }}
              fields={[
                { key: "question", label: "السؤال", type: "text" },
                { key: "answer", label: "الإجابة", type: "textarea" },
                serviceField,
                { key: "sort_order", label: "الترتيب", type: "number" },
                { key: "is_active", label: "مفعّل", type: "boolean" },
              ]}
            />
          )}

          {tab === "طلبات العملاء" && (
            <ResourceManager
              table="leads"
              title="طلبات العملاء"
              orderBy={{ column: "created_at", ascending: false }}
              fields={[
                { key: "name", label: "الاسم", type: "text" },
                { key: "phone", label: "الجوال", type: "text" },
                { key: "service", label: "الخدمة", type: "text" },
                { key: "district", label: "الحي", type: "text" },
                { key: "message", label: "الرسالة", type: "textarea" },
                {
                  key: "status",
                  label: "الحالة",
                  type: "select",
                  options: [
                    { value: "new", label: "جديد" },
                    { value: "contacted", label: "تم التواصل" },
                    { value: "won", label: "تم الاتفاق" },
                    { value: "lost", label: "مغلق" },
                  ],
                },
              ]}
            />
          )}

          {tab === "الإعدادات" && (
            <div>
              <p className="mb-4 text-sm text-muted-foreground">
                إعدادات الموقع العامة {settingsId ? "" : "(لم يتم إنشاء سجل الإعدادات بعد)"}
              </p>
              <ResourceManager
                table="site_settings"
                title="إعدادات الموقع"
                titleKey="site_name"
                fields={[
                  { key: "site_name", label: "اسم الموقع", type: "text" },
                  { key: "tagline", label: "الشعار النصي", type: "text" },
                  { key: "phone", label: "رقم الهاتف", type: "text" },
                  { key: "whatsapp", label: "رقم الواتساب", type: "text" },
                  { key: "service_area", label: "نطاق الخدمة", type: "text" },
                  { key: "business_hours", label: "ساعات العمل", type: "text" },
                  { key: "logo_url", label: "الشعار", type: "image", bucket: "uploads" },
                  { key: "hero_image_url", label: "صورة الواجهة", type: "image", bucket: "uploads" },
                  { key: "google_maps_url", label: "رابط خرائط جوجل", type: "text" },
                  { key: "google_business_profile_url", label: "نشاطي التجاري على جوجل", type: "text" },
                  { key: "instagram_url", label: "إنستقرام", type: "text" },
                  { key: "snapchat_url", label: "سناب شات", type: "text" },
                  { key: "tiktok_url", label: "تيك توك", type: "text" },
                  { key: "youtube_url", label: "يوتيوب", type: "text" },
                  { key: "facebook_url", label: "فيسبوك", type: "text" },
                  { key: "default_seo_title", label: "عنوان SEO الافتراضي", type: "text" },
                  { key: "default_seo_description", label: "وصف SEO الافتراضي", type: "textarea" },
                  { key: "analytics_id", label: "معرّف Google Analytics", type: "text" },
                  { key: "gtm_id", label: "معرّف Google Tag Manager", type: "text" },
                  { key: "google_verification_code", label: "كود تحقق جوجل", type: "text" },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
