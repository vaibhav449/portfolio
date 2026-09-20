import type { MetadataRoute } from "next";
import { profile, seo } from "@/data/resume";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.siteName,
    short_name: profile.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
