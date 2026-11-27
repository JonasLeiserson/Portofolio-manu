import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/bariloche")({
  head: () => ({
    meta: [
      { title: "Bariloche — Manu" },
      { name: "description", content: "Hay recuerdos que se hacen entre amigos." },
      { property: "og:title", content: "Bariloche — Manu" },
      { property: "og:description", content: "Hay recuerdos que se hacen entre amigos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Bariloche" />,
});
