import { queryOptions } from "@tanstack/react-query";
import {
  getArticle,
  getArticles,
  getFaqs,
  getGallery,
  getHomeData,
  getServicePage,
  getSiteData,
} from "./public.functions";

export const siteQuery = queryOptions({ queryKey: ["site"], queryFn: () => getSiteData() });
export const homeQuery = queryOptions({ queryKey: ["home"], queryFn: () => getHomeData() });
export const galleryQuery = queryOptions({ queryKey: ["gallery"], queryFn: () => getGallery() });
export const articlesQuery = queryOptions({ queryKey: ["articles"], queryFn: () => getArticles() });
export const faqsQuery = queryOptions({ queryKey: ["faqs"], queryFn: () => getFaqs() });

export const servicePageQuery = (slug: string) =>
  queryOptions({ queryKey: ["service", slug], queryFn: () => getServicePage({ data: { slug } }) });

export const articleQuery = (slug: string) =>
  queryOptions({ queryKey: ["article", slug], queryFn: () => getArticle({ data: { slug } }) });
