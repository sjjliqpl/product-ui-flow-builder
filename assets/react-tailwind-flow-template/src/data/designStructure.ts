import type { ComponentType } from "react";
import { SamplePage } from "../design-pages/SamplePage";

export type PageRecord = {
  id: string;
  title: string;
  intent: string;
  logic: string[];
  states?: string[];
  notes?: string[];
  component: ComponentType;
};

export type ChapterRecord = {
  id: string;
  title: string;
  description?: string;
  pages: PageRecord[];
};

export const chapters: ChapterRecord[] = [
  {
    id: "scaffold",
    title: "Scaffold",
    description: "Neutral structure for the generated UI flow document.",
    pages: [
      {
        id: "sample-page",
        title: "Sample Page",
        intent: "Show the active-page layout without adding product-specific content.",
        logic: [
          "Use the tree navigation to select one page at a time.",
          "Keep explanation content separate from the page sketch.",
        ],
        states: ["Default active page", "Mobile navigation drawer"],
        notes: ["Replace this record and component with the user's real product pages."],
        component: SamplePage,
      },
    ],
  },
];
