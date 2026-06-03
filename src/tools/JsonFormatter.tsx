import { useMemo, useState } from "react";
import { Panel, CodeArea, Button, CopyButton, Status } from "../components/ui";

const SAMPLE = '{"name":"devkit","tools":6,"offline":true,"tags":["json","jwt","hash"]}';

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "", message: "" };
    try {
      const parsed = JSON.parse(input);
      return {
        ok: true as const,
        output: JSON.stringify(parsed, null, indent),
        message: "Valid JSON",
      };
    } catch (err) {
      return {
        ok: false as const,
        output: "",
        message: err instanceof Error ? err.message : "Invalid JSON",
      };
    }
  }, [input, indent]);

  const minify = () => {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
    } catch {
      /* leave input as-is on parse error */
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title="Input"
        actions={
          <>
            <Button onClick={() => setIndent(indent === 2 ? 4 : 2)}>
              Indent: {indent}
            </Button>
            <Button onClick={minify}>Minify</Button>
            <Button onClick={() => setInput("")}>Clear</Button>
          </>
        }
      >
        <CodeArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here…"
        />
        <Status kind={input.trim() ? (result.ok ? "ok" : "error") : "idle"}>
          {result.message}
        </Status>
      </Panel>

      <Panel title="Formatted" actions={<CopyButton value={result.output} />}>
        <CodeArea readOnly value={result.output} placeholder="Pretty output…" />
      </Panel>
    </div>
  );
}
