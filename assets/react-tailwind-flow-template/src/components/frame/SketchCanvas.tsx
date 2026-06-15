import type { ReactNode } from "react";

type SketchCanvasProps = {
  children: ReactNode;
};

export function SketchCanvas({ children }: SketchCanvasProps) {
  return (
    <section className="min-w-0 rounded-lg border border-line bg-white p-4 shadow-panel">
      <div className="min-h-[520px] overflow-hidden rounded-md border border-strongLine bg-warm">
        {children}
      </div>
    </section>
  );
}
