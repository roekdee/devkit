import { useState } from "react";
import { Panel, Button, CopyButton, Labeled } from "../components/ui";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm text-text">{value}</code>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

export default function TimestampConverter() {
  const [seconds, setSeconds] = useState(() => Math.floor(Date.now() / 1000));

  const date = new Date(seconds * 1000);
  const valid = !Number.isNaN(date.getTime());

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title="Unix timestamp (seconds)"
        actions={
          <Button variant="accent" onClick={() => setSeconds(Math.floor(Date.now() / 1000))}>
            Now
          </Button>
        }
      >
        <Labeled label="Epoch seconds">
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg/60 px-3 py-2 text-sm outline-none focus:border-accent/60"
          />
        </Labeled>
        <p className="mt-3 text-xs text-muted">
          Tip: paste milliseconds and divide by 1000, or hit <b>Now</b> for the current time.
        </p>
      </Panel>

      <Panel title="Converted">
        {valid ? (
          <div>
            <Row label="ISO 8601 (UTC)" value={date.toISOString()} />
            <Row label="Local" value={date.toLocaleString()} />
            <Row label="UTC string" value={date.toUTCString()} />
            <Row label="Milliseconds" value={String(seconds * 1000)} />
            <Row label="Relative" value={relative(seconds * 1000)} />
          </div>
        ) : (
          <p className="text-sm text-danger">Invalid timestamp</p>
        )}
      </Panel>
    </div>
  );
}

function relative(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const units: [number, string][] = [
    [86400000, "day"],
    [3600000, "hour"],
    [60000, "minute"],
    [1000, "second"],
  ];
  for (const [size, name] of units) {
    if (abs >= size) {
      const n = Math.round(abs / size);
      return diff < 0 ? `${n} ${name}${n > 1 ? "s" : ""} ago` : `in ${n} ${name}${n > 1 ? "s" : ""}`;
    }
  }
  return "just now";
}
