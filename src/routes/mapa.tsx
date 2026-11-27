import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "¿Por dónde empezamos? — Manu" },
      { name: "description", content: "El mapa de viajes de Manu: Japón, Barcelona, Copenhagen y más." },
      { property: "og:title", content: "¿Por dónde empezamos? — Manu" },
      { property: "og:description", content: "El mapa de viajes de Manu: Japón, Barcelona, Copenhagen y más." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Mapa" />,
});
