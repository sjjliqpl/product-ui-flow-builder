import type { ChapterRecord } from "../../data/designStructure";

type FlowNavigationProps = {
  activePageId: string;
  chapters: ChapterRecord[];
  onSelectPage: (pageId: string) => void;
};

export function FlowNavigation({
  activePageId,
  chapters,
  onSelectPage,
}: FlowNavigationProps) {
  return (
    <nav className="flex h-full flex-col" aria-label="UI flow pages">
      <div className="shrink-0 border-b border-line px-4 py-6">
        <p className="font-mono text-xs uppercase text-accent">UI Flow</p>
        <h1 className="mt-1 text-lg font-semibold">Design Structure</h1>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5">
        {chapters.map((chapter, chapterIndex) => (
          <section key={chapter.id}>
            <div className="mb-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="font-mono text-[11px] font-normal uppercase text-faint">
                  {String(chapterIndex + 1).padStart(2, "0")}
                </span>
                <span>{chapter.title}</span>
              </h2>
              {chapter.description ? (
                <p className="mt-1 text-xs leading-5 text-muted">
                  {chapter.description}
                </p>
              ) : null}
            </div>

            <ol className="space-y-1 border-l border-line pl-3">
              {chapter.pages.map((page) => {
                const isActive = page.id === activePageId;

                return (
                  <li key={page.id}>
                    <button
                      className={[
                        "w-full rounded-md px-3 py-2 text-left text-sm transition",
                        isActive
                          ? "bg-accent text-white shadow-soft"
                          : "text-muted hover:bg-warm hover:text-ink",
                      ].join(" ")}
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => onSelectPage(page.id)}
                    >
                      {page.title}
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </nav>
  );
}
