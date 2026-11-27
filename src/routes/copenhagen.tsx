import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/copenhagen")({
  head: () => ({
    meta: [
      { title: "Copenhagen — Manu" },
      { name: "description", content: "Una ciudad para mirar relajado." },
      { property: "og:title", content: "Copenhagen — Manu" },
      { property: "og:description", content: "Una ciudad para mirar relajado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Copenhagen" />,
});
