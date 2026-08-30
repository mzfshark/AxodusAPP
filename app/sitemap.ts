import type { MetadataRoute } from "next";

const urls = [
  "/",
  "/what-is-axodus/",
  "/architecture/",
  "/governance/",
  "/research/",
  "/publications/",
  "/platforms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-26T00:00:00.000Z");

  return urls.map((url) => ({
    url: "https://axodus.country" + url,
    lastModified,
    changeFrequency: url === "/" ? "weekly" : "monthly",
    priority: url === "/" ? 1 : 0.7,
  }));
}
