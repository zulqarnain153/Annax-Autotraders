import { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { vehicles } from "@/lib/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/stock",
    "/finance",
    "/sell-your-car",
    "/part-exchange",
    "/about",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${business.seo.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${business.seo.siteUrl}/vehicle/${v.slug}`,
    lastModified: new Date(v.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
