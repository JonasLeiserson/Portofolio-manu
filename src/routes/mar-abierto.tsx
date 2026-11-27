import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/mar-abierto")({
  head: () => ({
    meta: [
      { title: "Mar abierto — Manu" },
      { name: "description", content: "Un viaje en el crucero más grande del mundo." },
      { property: "og:title", content: "Mar abierto — Manu" },
      { property: "og:description", content: "Un viaje en el crucero más grande del mundo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="MarAbierto" />,
});
