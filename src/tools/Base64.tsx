import { useState } from "react";
import { Panel, CodeArea, CopyButton, Button, Status } from "../components/ui";

type Mode = "encode" | "decode";

function encode(text: string): string {
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}

function decode(b64: string): string {
  const bytes = Uint8Array.from(atob(b64.trim()), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("Hello, Devkit ⚡");
  const [error, setError] = useState("");

  let output = "";
  try {
    output = input ? (mode === "encode" ? encode(input) : decode(input)) : "";
    if (error) setError("");
  } catch {
    if (!error) setError("Input is not valid Base64");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title={mode === "encode" ? "Plain text" : "Base64"}
        actions={
          <>
            <Button
              variant="accent"
              onClick={() => {
                setMode(mode === "encode" ? "decode" : "encode");
                setInput(output || input);
              }}
            >
              ⇄ {mode === "encode" ? "Encode" : "Decode"}
            </Button>
            <Button onClick={() => setInput("")}>Clear</Button>
          </>
        }
      >
        <CodeArea value={input} onChange={(e) => setInput(e.target.value)} />
        <Status kind={error ? "error" : "idle"}>{error}</Status>
      </Panel>

      <Panel
        title={mode === "encode" ? "Base64" : "Plain text"}
        actions={<CopyButton value={output} />}
      >
        <CodeArea readOnly value={output} placeholder="Result…" />
      </Panel>
    </div>
  );
}
