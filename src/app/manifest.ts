import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kisan Sathi",
    short_name: "Kisan Sathi",
    description: "AI-powered crop advisory frontend for smallholder farmers",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}