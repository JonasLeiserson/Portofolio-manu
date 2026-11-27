import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/japon")({
  head: () => ({
    meta: [
      { title: "Japón — Manu" },
      { name: "description", content: "Tokyo, entre luces y calles." },
      { property: "og:title", content: "Japón — Manu" },
      { property: "og:description", content: "Tokyo, entre luces y calles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Japon" />,
});
