import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/new-york")({
  head: () => ({
    meta: [
      { title: "New York — Manu" },
      { name: "description", content: "La ciudad que nunca para." },
      { property: "og:title", content: "New York — Manu" },
      { property: "og:description", content: "La ciudad que nunca para." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="NewYork" />,
});
