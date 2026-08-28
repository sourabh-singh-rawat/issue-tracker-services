import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

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
