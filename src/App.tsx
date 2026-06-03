import { useEffect, useState } from "react";
import { TOOLS } from "./tools/registry";

function useHashRoute(defaultId: string): [string, (id: string) => void] {
  const read = () => window.location.hash.replace(/^#\/?/, "") || defaultId;
  const [id, setId] = useState(read);

  useEffect(() => {
    const onHash = () => setId(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (next: string) => {
    window.location.hash = `/${next}`;
  };
  return [id, navigate];
}

export default function App() {
  const [activeId, navigate] = useHashRoute(TOOLS[0].id);
  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0];
  const Active = active.component;

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:py-10">
      {/* Sidebar */}
      <aside className="lg:w-72 lg:shrink-0">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-lg text-accent">
            ⚡
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Devkit</h1>
            <p className="text-[11px] text-muted">Developer utilities · offline</p>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {TOOLS.map((t) => {
            const on = t.id === active.id;
            return (
              <button
                key={t.id}
                onClick={() => navigate(t.id)}
                className={
                  "group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition " +
                  (on
                    ? "border-accent/40 bg-accent/10"
                    : "border-border bg-surface/50 hover:border-accent/30 hover:bg-surface")
                }
              >
                <span
                  className={
                    "grid h-7 w-7 shrink-0 place-items-center rounded-md font-mono text-sm " +
                    (on ? "bg-accent/20 text-accent" : "bg-bg/60 text-muted")
                  }
                >
                  {t.icon}
                </span>
                <span className="min-w-0">
                  <span className={"block text-sm font-medium " + (on ? "text-text" : "text-text/90")}>
                    {t.name}
                  </span>
                  <span className="hidden truncate text-[11px] text-muted lg:block">{t.blurb}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <a
          href="https://github.com/roekdee/devkit"
          target="_blank"
          rel="noreferrer"
          className="mt-6 hidden text-xs text-muted transition hover:text-accent lg:block"
        >
          ↗ Source on GitHub
        </a>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        <header className="mb-5">
          <h2 className="text-2xl font-semibold tracking-tight">{active.name}</h2>
          <p className="text-sm text-muted">{active.blurb}</p>
        </header>
        <div key={active.id} className="animate-in">
          <Active />
        </div>

        <footer className="mt-10 border-t border-border pt-4 text-center text-[11px] text-muted">
          Everything runs in your browser — no network calls, no tracking. Built with React + TypeScript + Tailwind.
        </footer>
      </main>
    </div>
  );
}
