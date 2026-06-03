import { useState } from "react";
import { Panel, CodeArea, CopyButton, Button, Status } from "../components/ui";

type Mode = "encode" | "decode";

export default function UrlEncode() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("name=Café Déjà&page=2");
  const [error, setError] = useState("");

  let output = "";
  try {
    output = input
      ? mode === "encode"
        ? encodeURIComponent(input)
        : decodeURIComponent(input)
      : "";
    if (error) setError("");
  } catch {
    if (!error) setError("Input contains an invalid percent-encoding sequence");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title={mode === "encode" ? "Plain text" : "Encoded"}
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
        title={mode === "encode" ? "Encoded" : "Plain text"}
        actions={<CopyButton value={output} />}
      >
        <CodeArea readOnly value={output} placeholder="Result…" />
      </Panel>
    </div>
  );
}
