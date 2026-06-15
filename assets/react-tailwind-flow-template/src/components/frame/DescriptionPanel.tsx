import type { PageRecord } from "../../data/designStructure";

type DescriptionPanelProps = {
  page: PageRecord;
};

export function DescriptionPanel({ page }: DescriptionPanelProps) {
  return (
    <aside className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <p className="font-mono text-xs uppercase text-accent">Current page</p>
      <h2 className="mt-2 text-xl font-semibold">{page.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{page.intent}</p>

      <section className="mt-5">
        <h3 className="text-sm font-semibold">Logic</h3>
        <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
          {page.logic.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {page.states?.length ? (
        <section className="mt-5">
          <h3 className="text-sm font-semibold">States</h3>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
            {page.states.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {page.notes?.length ? (
        <section className="mt-5">
          <h3 className="text-sm font-semibold">Notes</h3>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">
            {page.notes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
