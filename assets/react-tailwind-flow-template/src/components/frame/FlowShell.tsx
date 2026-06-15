import { useMemo, useState } from "react";
import type { ChapterRecord, PageRecord } from "../../data/designStructure";
import { PageDesignBlock } from "../flow/PageDesignBlock";
import { FlowNavigation } from "./FlowNavigation";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

type FlowShellProps = {
  chapters: ChapterRecord[];
};

function getFirstPage(chapters: ChapterRecord[]): PageRecord | undefined {
  return chapters.find((chapter) => chapter.pages.length > 0)?.pages[0];
}

function findPage(chapters: ChapterRecord[], pageId: string): PageRecord | undefined {
  for (const chapter of chapters) {
    const page = chapter.pages.find((candidate) => candidate.id === pageId);
    if (page) return page;
  }

  return undefined;
}

export function FlowShell({ chapters }: FlowShellProps) {
  const firstPage = getFirstPage(chapters);
  const [activePageId, setActivePageId] = useState(firstPage?.id ?? "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activePage = useMemo(
    () => findPage(chapters, activePageId) ?? firstPage,
    [activePageId, chapters, firstPage],
  );

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-line bg-white/85 lg:block">
          <FlowNavigation
            activePageId={activePage?.id ?? ""}
            chapters={chapters}
            onSelectPage={setActivePageId}
          />
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
            <div>
              <p className="font-mono text-xs uppercase text-accent">UI Flow</p>
              <h1 className="text-base font-semibold">Design Structure</h1>
            </div>
            <button
              className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink shadow-soft"
              type="button"
              onClick={() => setIsDrawerOpen(true)}
            >
              Menu
            </button>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {activePage ? (
              <PageDesignBlock page={activePage} />
            ) : (
              <div className="rounded-lg border border-line bg-white p-6 text-sm text-muted">
                Add a page record in designStructure.ts to begin.
              </div>
            )}
          </div>
        </section>
      </div>

      <MobileNavigationDrawer
        activePageId={activePage?.id ?? ""}
        chapters={chapters}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectPage={(pageId) => {
          setActivePageId(pageId);
          setIsDrawerOpen(false);
        }}
      />
    </main>
  );
}
