import { useEffect, useState } from "react";
import { Panel, CodeArea, CopyButton, Button } from "../components/ui";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("Hello, Devkit ⚡");
  const [algo, setAlgo] = useState<Algo>("SHA-256");
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHash("");
      return;
    }
    crypto.subtle
      .digest(algo, new TextEncoder().encode(input))
      .then((buf) => {
        if (!cancelled) setHash(toHex(buf));
      });
    return () => {
      cancelled = true;
    };
  }, [input, algo]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title="Text"
        actions={
          <>
            {ALGOS.map((a) => (
              <Button key={a} variant={a === algo ? "accent" : "ghost"} onClick={() => setAlgo(a)}>
                {a}
              </Button>
            ))}
          </>
        }
      >
        <CodeArea value={input} onChange={(e) => setInput(e.target.value)} />
      </Panel>

      <Panel title={`${algo} digest`} actions={<CopyButton value={hash} />}>
        <CodeArea readOnly value={hash} placeholder="Hash output…" />
        <p className="mt-2 text-xs text-muted">
          Computed in-browser with the <code className="text-accent">Web Crypto API</code> —
          nothing is sent anywhere.
        </p>
      </Panel>
    </div>
  );
}
