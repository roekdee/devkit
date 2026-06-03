import { useState, type ReactNode, type TextareaHTMLAttributes } from "react";

export function Panel({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-xl border border-border bg-surface/70 backdrop-blur-sm">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        <div className="flex items-center gap-2">{actions}</div>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </section>
  );
}

export function CodeArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      spellCheck={false}
      className={
        "h-full min-h-[260px] w-full resize-none rounded-lg border border-border bg-bg/60 p-3 text-sm leading-relaxed text-text outline-none transition focus:border-accent/60 " +
        className
      }
      {...props}
    />
  );
}

export function Button({
  children,
  onClick,
  variant = "ghost",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "accent";
  title?: string;
}) {
  const base =
    "rounded-md px-2.5 py-1.5 text-xs font-medium transition active:scale-95";
  const styles =
    variant === "accent"
      ? "bg-accent/15 text-accent hover:bg-accent/25"
      : "border border-border text-muted hover:border-accent/40 hover:text-text";
  return (
    <button title={title} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="accent"
      title="Copy to clipboard"
      onClick={async () => {
        if (!value) return;
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </Button>
  );
}

export function Status({
  kind,
  children,
}: {
  kind: "ok" | "error" | "idle";
  children: ReactNode;
}) {
  if (kind === "idle") return null;
  const color = kind === "ok" ? "text-accent" : "text-danger";
  return <p className={`mt-2 text-xs ${color}`}>{children}</p>;
}

export function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
