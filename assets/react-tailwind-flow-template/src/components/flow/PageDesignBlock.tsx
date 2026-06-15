import type { PageRecord } from "../../data/designStructure";
import { DescriptionPanel } from "../frame/DescriptionPanel";
import { SketchCanvas } from "../frame/SketchCanvas";

type PageDesignBlockProps = {
  page: PageRecord;
};

export function PageDesignBlock({ page }: PageDesignBlockProps) {
  const PageComponent = page.component;

  return (
    <article className="grid gap-5 xl:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
      <DescriptionPanel page={page} />
      <SketchCanvas>
        <PageComponent />
      </SketchCanvas>
    </article>
  );
}
