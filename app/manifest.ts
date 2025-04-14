import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safety Solutions",
    short_name: "Safety Solutions",
    description: "Sistema de relatórios e inspeções de segurança ocupacional",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffeb3b",
    icons: [
      {
        src: "/images/safety-solutions-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/safety-solutions-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
