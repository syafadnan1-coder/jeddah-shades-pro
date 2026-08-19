import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "دخول الإدارة | الخبراء التظليل" },
      { name: "description", content: "صفحة دخول لوحة تحكم موقع الخبراء التظليل." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "دخول الإدارة | الخبراء التظليل" },
      { property: "og:description", content: "صفحة دخول لوحة تحكم موقع الخبراء التظليل." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setLoading(true);
    const res =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setLoading(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    if (mode === "signup" && !res.data.session) {
      toast.success("تم إنشاء الحساب، تحقق من بريدك لتأكيد التسجيل");
      return;
    }
    void navigate({ to: "/admin" });
  }

  const field =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

  return (
    <section className="section-y">
      <div className="container-site max-w-md">
        <h1 className="text-2xl font-extrabold">
          {mode === "signin" ? "دخول لوحة التحكم" : "إنشاء حساب إداري"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          هذه الصفحة مخصصة لفريق إدارة الموقع فقط.
        </p>
        <form onSubmit={onSubmit} className="card-soft mt-6 grid gap-4 p-6">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-bold">البريد الإلكتروني</label>
            <input id="email" name="email" type="email" required className={field} dir="ltr" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-bold">كلمة المرور</label>
            <input id="password" name="password" type="password" required minLength={6} className={field} dir="ltr" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "جارٍ المعالجة..." : mode === "signin" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-xs font-bold text-primary underline"
          >
            {mode === "signin" ? "ليس لديك حساب؟ إنشاء حساب" : "لدي حساب بالفعل"}
          </button>
        </form>
      </div>
    </section>
  );
}
