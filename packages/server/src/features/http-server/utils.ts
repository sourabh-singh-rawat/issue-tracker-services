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
