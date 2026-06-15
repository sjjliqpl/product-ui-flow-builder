export function SamplePage() {
  return (
    <div className="flex min-h-[520px] flex-col bg-white text-ink">
      <header className="border-b border-line px-6 py-4">
        <p className="font-mono text-xs uppercase text-accent">Page sketch</p>
        <h2 className="mt-1 text-2xl font-semibold">Neutral Page</h2>
      </header>

      <main className="grid flex-1 gap-4 p-6 md:grid-cols-[1fr_16rem]">
        <section className="rounded-md border border-line bg-paper p-5">
          <div className="h-4 w-32 rounded bg-strongLine" />
          <div className="mt-5 grid gap-3">
            <div className="h-24 rounded border border-line bg-white" />
            <div className="h-24 rounded border border-line bg-white" />
            <div className="h-24 rounded border border-line bg-white" />
          </div>
        </section>

        <aside className="rounded-md border border-line bg-warm p-5">
          <div className="h-4 w-20 rounded bg-strongLine" />
          <div className="mt-5 space-y-3">
            <div className="h-10 rounded bg-white" />
            <div className="h-10 rounded bg-white" />
            <div className="h-10 rounded bg-white" />
          </div>
        </aside>
      </main>
    </div>
  );
}
