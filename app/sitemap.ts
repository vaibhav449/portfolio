import type { MetadataRoute } from "next";
import { seo } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.url,
      lastModified: new Date("2026-07-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
