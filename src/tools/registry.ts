import type { ComponentType } from "react";
import JsonFormatter from "./JsonFormatter";
import JwtDecoder from "./JwtDecoder";
import Base64 from "./Base64";
import UrlEncode from "./UrlEncode";
import UuidGenerator from "./UuidGenerator";
import TimestampConverter from "./TimestampConverter";
import HashGenerator from "./HashGenerator";

export interface Tool {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  component: ComponentType;
}

export const TOOLS: Tool[] = [
  {
    id: "json",
    name: "JSON Formatter",
    icon: "{ }",
    blurb: "Pretty-print, minify, and validate JSON",
    component: JsonFormatter,
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    icon: "🔑",
    blurb: "Inspect header & payload of a token",
    component: JwtDecoder,
  },
  {
    id: "base64",
    name: "Base64",
    icon: "⇄",
    blurb: "Encode and decode Base64 (UTF-8 safe)",
    component: Base64,
  },
  {
    id: "url",
    name: "URL Encode",
    icon: "%",
    blurb: "Percent-encode and decode URL components",
    component: UrlEncode,
  },
  {
    id: "uuid",
    name: "UUID Generator",
    icon: "🆔",
    blurb: "Generate v4 UUIDs in bulk",
    component: UuidGenerator,
  },
  {
    id: "timestamp",
    name: "Timestamp",
    icon: "🕒",
    blurb: "Convert Unix epoch ↔ human dates",
    component: TimestampConverter,
  },
  {
    id: "hash",
    name: "Hash",
    icon: "#",
    blurb: "SHA-1/256/384/512 via Web Crypto",
    component: HashGenerator,
  },
];
