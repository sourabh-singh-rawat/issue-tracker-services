import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { HttpResponse } from "./types/HttpResponse";

export const redirect = (location: string, status = 302): HttpResponse => ({
  status,
  headers: { Location: location },
});

export const json = (body: unknown, status = 200): HttpResponse => ({
  status,
  body,
});

export const readTlsFile = (filePath: string): Buffer => {
  if (path.isAbsolute(filePath)) {
    return readFileSync(filePath);
  }
  const directPath = path.resolve(process.cwd(), filePath);
  if (existsSync(directPath)) {
    return readFileSync(directPath);
  }
  const monorepoPath = path.resolve(process.cwd(), "../../", filePath);
  if (existsSync(monorepoPath)) {
    return readFileSync(monorepoPath);
  }
  return readFileSync(directPath);
};

export const expandLoopbackOrigins = (origins: readonly string[]): string[] => {
  const result = new Set<string>();
  for (const origin of origins) {
    result.add(origin);
    try {
      const parsed = new URL(origin);
      if (parsed.hostname === "localhost") {
        const loopback = new URL(parsed.origin);
        loopback.hostname = "127.0.0.1";
        result.add(loopback.origin);
      } else if (parsed.hostname === "127.0.0.1") {
        const loopback = new URL(parsed.origin);
        loopback.hostname = "localhost";
        result.add(loopback.origin);
      }
    } catch {}
  }
  return [...result];
};

