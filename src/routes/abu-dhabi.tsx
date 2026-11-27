import { createFileRoute } from "@tanstack/react-router";
import { FigmaPage } from "@/components/FigmaPage";

export const Route = createFileRoute("/abu-dhabi")({
  head: () => ({
    meta: [
      { title: "Abu Dhabi — Manu" },
      { name: "description", content: "Diversión y familia en Abu Dhabi." },
      { property: "og:title", content: "Abu Dhabi — Manu" },
      { property: "og:description", content: "Diversión y familia en Abu Dhabi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FigmaPage id="AbuDhabi" />,
});
