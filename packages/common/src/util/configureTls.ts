import { readFileSync } from "node:fs";
import { Agent, setGlobalDispatcher } from "undici";

export interface ConfigureTlsOptions {
  caPath: string;
  certPath: string;
  keyPath: string;
}

export const configureTls = ({ caPath, certPath, keyPath }: ConfigureTlsOptions): void => {
  setGlobalDispatcher(
    new Agent({
      connect: {
        ca: readFileSync(caPath),
        cert: readFileSync(certPath),
        key: readFileSync(keyPath),
      },
    }),
  );
};
