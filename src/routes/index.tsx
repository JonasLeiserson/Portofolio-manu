import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manu — Portafolio de viajes" },
      { name: "description", content: "No viajé para tener fotos. Viajé por experiencias." },
      { property: "og:title", content: "Manu — Portafolio de viajes" },
      { property: "og:description", content: "No viajé para tener fotos. Viajé por experiencias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Inicio" />,
});
