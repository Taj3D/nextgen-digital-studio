import type { MetadataRoute } from "next";
import { siteConfig, blogPosts, caseStudies } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const homepage: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/admin`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
  return [...homepage, ...staticPages];
}
