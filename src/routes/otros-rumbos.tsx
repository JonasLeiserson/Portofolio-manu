import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/otros-rumbos")({
  head: () => ({
    meta: [
      { title: "Otros rumbos — Manu" },
      { name: "description", content: "Paisajes, caminos y gente con las que creamos momentos." },
      { property: "og:title", content: "Otros rumbos — Manu" },
      { property: "og:description", content: "Paisajes, caminos y gente con las que creamos momentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="OtrosRumbos" />,
});
