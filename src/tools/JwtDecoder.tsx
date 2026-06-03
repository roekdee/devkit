import { useMemo, useState } from "react";
import { Panel, CodeArea, CopyButton, Status, Button } from "../components/ui";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  ".eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJvZWtkZWUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYyMzkwMjJ9" +
  ".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function b64urlDecode(part: string): string {
  const pad = part.length % 4 === 0 ? "" : "=".repeat(4 - (part.length % 4));
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function pretty(json: string): string {
  return JSON.stringify(JSON.parse(json), null, 2);
}

function describeExpiry(payload: Record<string, unknown>): string | null {
  const exp = payload.exp;
  if (typeof exp !== "number") return null;
  const when = new Date(exp * 1000);
  const expired = Date.now() > exp * 1000;
  return `${expired ? "⚠ expired" : "✓ valid"} · exp ${when.toLocaleString()}`;
}

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE);

  const decoded = useMemo(() => {
    if (!token.trim()) return { ok: true as const, header: "", payload: "", note: "", message: "" };
    const parts = token.trim().split(".");
    if (parts.length < 2)
      return { ok: false as const, header: "", payload: "", note: "", message: "Not a JWT (expected header.payload.signature)" };
    try {
      const header = pretty(b64urlDecode(parts[0]));
      const payloadRaw = b64urlDecode(parts[1]);
      const payload = pretty(payloadRaw);
      const note = describeExpiry(JSON.parse(payloadRaw)) ?? "";
      return { ok: true as const, header, payload, note, message: "Decoded — signature is not verified (client-side only)" };
    } catch {
      return { ok: false as const, header: "", payload: "", note: "", message: "Could not decode token segments" };
    }
  }, [token]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="JWT" actions={<Button onClick={() => setToken("")}>Clear</Button>}>
        <CodeArea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste a JSON Web Token…"
        />
        <Status kind={token.trim() ? (decoded.ok ? "ok" : "error") : "idle"}>
          {decoded.message}
        </Status>
        {decoded.note && <p className="mt-1 text-xs text-warn">{decoded.note}</p>}
      </Panel>

      <div className="grid gap-4">
        <Panel title="Header" actions={<CopyButton value={decoded.header} />}>
          <CodeArea readOnly className="min-h-[110px]" value={decoded.header} />
        </Panel>
        <Panel title="Payload" actions={<CopyButton value={decoded.payload} />}>
          <CodeArea readOnly className="min-h-[110px]" value={decoded.payload} />
        </Panel>
      </div>
    </div>
  );
}
