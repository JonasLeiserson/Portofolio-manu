import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/mexico")({
  head: () => ({
    meta: [
      { title: "México — Manu" },
      { name: "description", content: "Costa Maya: caminar, mirar y disfrutar." },
      { property: "og:title", content: "México — Manu" },
      { property: "og:description", content: "Costa Maya: caminar, mirar y disfrutar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="Mexico" />,
});
