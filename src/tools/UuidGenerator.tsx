import { useCallback, useState } from "react";
import { Panel, CodeArea, CopyButton, Button, Labeled } from "../components/ui";

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);

  const generate = useCallback(() => {
    const n = Math.min(Math.max(count, 1), 100);
    setList(Array.from({ length: n }, () => crypto.randomUUID()));
  }, [count]);

  const text = list.join("\n");

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <Panel title="Options">
        <div className="space-y-4">
          <Labeled label="How many (1–100)">
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-bg/60 px-3 py-2 text-sm outline-none focus:border-accent/60"
            />
          </Labeled>
          <Button variant="accent" onClick={generate}>
            ⚡ Generate UUID v4
          </Button>
          <p className="text-xs text-muted">
            Uses the native <code className="text-accent">crypto.randomUUID()</code> —
            cryptographically strong, RFC&nbsp;4122 v4.
          </p>
        </div>
      </Panel>

      <Panel
        title={list.length ? `${list.length} UUIDs` : "Output"}
        actions={<CopyButton value={text} />}
      >
        <CodeArea readOnly value={text} placeholder="Press Generate…" />
      </Panel>
    </div>
  );
}
