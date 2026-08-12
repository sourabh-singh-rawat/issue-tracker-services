#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const isWindows = process.platform === "win32";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const run = (
  args: readonly string[],
  options: { captureStdout?: boolean; env?: NodeJS.ProcessEnv } = {},
): string => {
  const result = spawnSync("pnpm", [...args], {
    cwd: rootDir,
    env: { ...process.env, ...options.env },
    encoding: "utf8",
    shell: isWindows,
    windowsHide: true,
    maxBuffer: 20 * 1024 * 1024,
    stdio: options.captureStdout ? ["ignore", "pipe", "inherit"] : "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result.stdout ?? "";
};

const parseIdentityId = (output: string): string => {
  const match = output.match(/^IDENTITY_ID=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\s*$/im);
  const identityId = match?.[1]?.trim();
  if (!identityId || !UUID_PATTERN.test(identityId)) {
    throw new Error(
      "bootstrap-admin did not print IDENTITY_ID=<uuid>. Ensure identity-service CLI is up to date and BOOTSTRAP_ADMIN_* env vars are set.",
    );
  }
  return identityId;
};

const main = (): void => {
  console.log("setup: running database migrations");
  run(["db:migrate"]);

  console.log("setup: seeding platform-service");
  run(["--filter", "@pine/platform-service", "db:seed"]);

  console.log("setup: bootstrapping admin identity");
  const bootstrapOutput = run(
    ["--filter", "@pine/identity-service", "cli:bootstrap-admin"],
    { captureStdout: true },
  );
  process.stdout.write(bootstrapOutput);

  const identityId = parseIdentityId(bootstrapOutput);
  console.log(`setup: admin identity id=${identityId}`);

  console.log("setup: granting platform admin role");
  run(["--filter", "@pine/platform-service", "cli:grant-platform-admin"], {
    env: { GRANT_PLATFORM_ADMIN_IDENTITY_ID: identityId },
  });

  console.log("setup: completed");
};

try {
  main();
} catch (error: unknown) {
  console.error(error);
  process.exit(1);
}
