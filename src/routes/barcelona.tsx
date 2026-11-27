import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/barcelona")({
  head: () => ({
    meta: [
      { title: "Barcelona — Manu" },
      { name: "description", content: "Una ciudad que abrió puertas." },
      { property: "og:title", content: "Barcelona — Manu" },
      { property: "og:description", content: "Una ciudad que abrió puertas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Barcelona" />,
});
