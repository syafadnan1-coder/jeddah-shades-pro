import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [settings, services, nav, social] = await Promise.all([
    sb.from("site_settings").select("*").limit(1).maybeSingle(),
    sb.from("services").select("*").eq("is_active", true).order("sort_order"),
    sb.from("navigation_items").select("*").eq("is_active", true).order("sort_order"),
    sb.from("social_links").select("*").eq("is_active", true).order("sort_order"),
  ]);
  return {
    settings: settings.data ?? null,
    services: services.data ?? [],
    nav: nav.data ?? [],
    social: social.data ?? [],
  };
});

export const getServicePage = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: service } = await sb
      .from("services")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!service) return { service: null, types: [], faqs: [], projects: [] };
    const [types, faqs, projects] = await Promise.all([
      sb.from("service_types").select("*").eq("service_id", service.id).eq("is_active", true).order("sort_order"),
      sb.from("faqs").select("*").eq("service_id", service.id).eq("is_active", true).order("sort_order"),
      sb.from("projects").select("*").eq("service_id", service.id).eq("is_active", true).order("created_at", { ascending: false }).limit(6),
    ]);
    return {
      service,
      types: types.data ?? [],
      faqs: faqs.data ?? [],
      projects: projects.data ?? [],
    };
  });

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [projects, faqs, articles] = await Promise.all([
    sb.from("projects").select("*").eq("is_active", true).order("is_featured", { ascending: false }).limit(6),
    sb.from("faqs").select("*").eq("is_active", true).order("sort_order").limit(8),
    sb.from("articles").select("id,slug,title,excerpt,featured_image,published_at").eq("published", true).order("published_at", { ascending: false }).limit(3),
  ]);
  return { projects: projects.data ?? [], faqs: faqs.data ?? [], articles: articles.data ?? [] };
});

export const getGallery = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [projects, images, cats] = await Promise.all([
    sb.from("projects").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    sb.from("project_images").select("*").order("sort_order"),
    sb.from("gallery_categories").select("*").eq("is_active", true).order("sort_order"),
  ]);
  return { projects: projects.data ?? [], images: images.data ?? [], categories: cats.data ?? [] };
});

export const getArticles = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb
    .from("articles")
    .select("id,slug,title,excerpt,featured_image,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
});

export const getArticle = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: article } = await sb
      .from("articles")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    return article;
  });

export const getFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb.from("faqs").select("*").eq("is_active", true).order("sort_order");
  return data ?? [];
});
