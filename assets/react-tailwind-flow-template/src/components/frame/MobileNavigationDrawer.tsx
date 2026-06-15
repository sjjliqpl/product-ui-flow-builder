import type { ChapterRecord } from "../../data/designStructure";
import { FlowNavigation } from "./FlowNavigation";

type MobileNavigationDrawerProps = {
  activePageId: string;
  chapters: ChapterRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (pageId: string) => void;
};

export function MobileNavigationDrawer({
  activePageId,
  chapters,
  isOpen,
  onClose,
  onSelectPage,
}: MobileNavigationDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        className="absolute inset-0 bg-ink/35"
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside className="relative h-full w-[min(22rem,88vw)] overflow-hidden border-r border-line bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-sm font-semibold">Pages</p>
          <button
            className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <FlowNavigation
          activePageId={activePageId}
          chapters={chapters}
          onSelectPage={onSelectPage}
        />
      </aside>
    </div>
  );
}
