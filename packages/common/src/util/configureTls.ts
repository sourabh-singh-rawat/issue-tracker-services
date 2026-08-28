import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { Agent, setGlobalDispatcher } from "undici";

export interface ConfigureTlsOptions {
  caPath: string;
}

export const configureTls = ({ caPath }: ConfigureTlsOptions) => {
  let resolved = caPath;
  if (!path.isAbsolute(caPath)) {
    const directPath = path.resolve(process.cwd(), caPath);
    const monorepoPath = path.resolve(process.cwd(), "../../", caPath);
    if (existsSync(directPath)) {
      resolved = directPath;
    } else if (existsSync(monorepoPath)) {
      resolved = monorepoPath;
    }
  }

  const ca = readFileSync(resolved);
  const dispatcher = new Agent({ connect: { ca } });
  setGlobalDispatcher(dispatcher);
};
