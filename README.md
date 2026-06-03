<div align="center">

# ⚡ Devkit — Developer Utilities

### A fast, offline-first toolbox of everyday developer utilities

Six tools I kept reaching for — a JSON formatter, JWT decoder, Base64 converter, UUID generator, timestamp converter, and a hash generator — in one clean, keyboard-friendly app. **Everything runs in the browser. No network calls, no tracking, nothing leaves your machine.**

[![Live demo](https://img.shields.io/badge/▶_Live_demo-roekdee.github.io/devkit-5eead4?style=for-the-badge)](https://roekdee.github.io/devkit/)
&nbsp;
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<img src="docs/json.png" alt="Devkit JSON formatter" width="820" />

</div>

---

## ✨ Tools

| Tool | What it does |
|---|---|
| **JSON Formatter** | Pretty-print, minify, and validate JSON with live error messages |
| **JWT Decoder** | Decode header & payload, with expiry detection (signature not verified — client-side) |
| **Base64** | Encode/decode with one-click direction swap, UTF-8 safe |
| **UUID Generator** | Bulk-generate RFC 4122 v4 UUIDs via `crypto.randomUUID()` |
| **Timestamp** | Convert Unix epoch ↔ ISO / local / relative time |
| **Hash** | SHA-1 / 256 / 384 / 512 digests via the Web Crypto API |

<div align="center">
<img src="docs/jwt.png" alt="JWT decoder" width="410" />
<img src="docs/hash.png" alt="Hash generator" width="410" />
</div>

## 🧠 Why it's built this way

- **100% client-side.** Sensitive input (tokens, payloads, text to hash) never touches a server — the app makes zero network requests at runtime. Hashing uses the native **Web Crypto API**; UUIDs use `crypto.randomUUID()`.
- **Pluggable tool registry.** Each tool is a self-contained component registered in [`src/tools/registry.ts`](src/tools/registry.ts). Adding a new tool is one entry + one file — the sidebar, routing, and layout pick it up automatically.
- **Hash-based routing**, so every tool is deep-linkable (`/#/jwt`) and the static build works on GitHub Pages without server rewrites.
- **Design tokens, not magic numbers.** A small dark design system lives in [`src/index.css`](src/index.css) using Tailwind v4's `@theme`.

## 🏗️ Architecture

```
src/
  App.tsx              Shell · sidebar nav · hash router
  index.css            Tailwind v4 theme (design tokens)
  components/ui.tsx     Reusable primitives (Panel, CodeArea, CopyButton…)
  tools/
    registry.ts        Single source of truth — id, name, icon, component
    JsonFormatter.tsx
    JwtDecoder.tsx
    Base64.tsx
    UuidGenerator.tsx
    TimestampConverter.tsx
    HashGenerator.tsx
```

## 🚀 Run locally

```bash
npm install
npm run dev        # http://localhost:5173/devkit/
npm run build      # type-check + production build to dist/
```

## 📦 Deploy

Pushing to `main` triggers a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds the app and publishes `dist/` to GitHub Pages — the live demo above updates automatically.

## 🛠️ Tech

React 19 · TypeScript 5 · Vite 6 · Tailwind CSS v4 · Web Crypto API · GitHub Actions → Pages

---

<div align="center">
<sub>No backend, no database, no telemetry — just static files and the browser's own APIs.</sub>
</div>
