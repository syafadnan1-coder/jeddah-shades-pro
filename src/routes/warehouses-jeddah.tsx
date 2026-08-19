import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getServiceContent } from "@/lib/content";
import { servicePageQuery } from "@/lib/queries";

const content = getServiceContent("warehouses-jeddah")!;

export const Route = createFileRoute("/warehouses-jeddah")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicePageQuery("warehouses-jeddah")),
  head: () => ({
    meta: [
      { title: content.title },
      { name: "description", content: content.description },
      { property: "og:title", content: content.title },
      { property: "og:description", content: content.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/warehouses-jeddah" },
    ],
    links: [{ rel: "canonical", href: "/warehouses-jeddah" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: content.h1,
          description: content.description,
          areaServed: { "@type": "City", name: "جدة" },
          provider: { "@type": "LocalBusiness", name: "الخبراء التظليل", telephone: "+966509386171" },
        }),
      },
    ],
  }),
  component: () => <ServicePage content={content} />,
});
