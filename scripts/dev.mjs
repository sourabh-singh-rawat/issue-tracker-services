#!/usr/bin/env node
/**
 * Single entrypoint: infra (Docker Compose) + client + backend services via Nx.
 *
 *   pnpm dev
 *   pnpm dev -- --no-infra
 *   pnpm dev -- --infra-only
 *   pnpm dev -- --apps=client,auth,gateway
 *   pnpm dev -- --down
 *   pnpm dev -- --skip-compose-check
 *   pnpm dev -- --skip-gql
 *   pnpm dev -- --help
 */

import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const isWin = process.platform === "win32";

const DEFAULT_APPS = [
  "client",
  "auth",
  "attachment",
  "mail",
  "issue-tracker",
  "gateway",
];

const REQUIRED_ENV = [
  "JWT_SECRET",
  "ISSUE_TRACKER_CLIENT_URL",
  "NATS_CLUSTER_URL",
  "AUTH_POSTGRES_CLUSTER_URL",
  "ISSUE_TRACKER_POSTGRES_CLUSTER_URL",
  "MAIL_POSTGRES_CLUSTER_URL",
  "ATTACHMENT_POSTGRES_CLUSTER_URL",
  "AUTH_SERVICE_PORT",
  "ISSUE_TRACKER_SERVICE_PORT",
];

const WAIT_TARGETS = [
  { host: "127.0.0.1", port: 4222, name: "NATS" },
  { host: "127.0.0.1", port: 5432, name: "issue-tracker Postgres" },
];

function log(msg) {
  console.log(`[dev] ${msg}`);
}

function fail(msg, code = 1) {
  console.error(`[dev] ERROR: ${msg}`);
  process.exit(code);
}

function parseArgs(argv) {
  const opts = {
    infra: true,
    apps: true,
    appsList: [...DEFAULT_APPS],
    down: false,
    skipComposeCheck: false,
    skipGql: false,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--no-infra") opts.infra = false;
    else if (arg === "--infra-only") {
      opts.apps = false;
      opts.infra = true;
    } else if (arg === "--down") opts.down = true;
    else if (arg === "--skip-compose-check") opts.skipComposeCheck = true;
    else if (arg === "--skip-gql") opts.skipGql = true;
    else if (arg.startsWith("--apps=")) {
      const list = arg
        .slice("--apps=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (list.length) opts.appsList = list;
    } else {
      fail(`Unknown flag: ${arg}\nRun with --help for usage.`);
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
Usage: pnpm dev -- [options]

Starts Docker Compose infra and all local apps (client + microservices) via Nx.

Options:
  --no-infra              Skip docker compose (apps only)
  --infra-only            Only start (or tear down) compose
  --apps=a,b,c            Subset of Nx projects (default: ${DEFAULT_APPS.join(",")})
  --down                  docker compose down instead of up
  --skip-compose-check    Do not require docker when --no-infra
  --skip-gql              Do not run rover supergraph compose
  --help, -h              Show this help

Examples:
  pnpm dev
  pnpm dev -- --no-infra
  pnpm dev -- --apps=client,auth,gateway
  pnpm dev -- --infra-only --down
`);
}

function commandExists(cmd) {
  const checker = isWin ? "where" : "which";
  const result = spawnSync(checker, [cmd], {
    encoding: "utf8",
    shell: isWin,
  });
  return result.status === 0;
}

function run(cmd, args, { cwd = ROOT, env = process.env } = {}) {
  const result = spawnSync(cmd, args, {
    cwd,
    env,
    stdio: "inherit",
    shell: isWin,
  });
  if (result.error) {
    fail(result.error.message);
  }
  if (result.status !== 0 && result.status !== null) {
    fail(`Command failed (${result.status}): ${cmd} ${args.join(" ")}`);
  }
  return result;
}

function runAsync(cmd, args, { cwd = ROOT, env = process.env } = {}) {
  return spawn(cmd, args, {
    cwd,
    env,
    stdio: "inherit",
    shell: isWin,
  });
}

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const text = readFileSync(filePath, "utf8");
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function ensureEnv() {
  const envPath = path.join(ROOT, ".env");
  const examplePath = path.join(ROOT, ".env.example");

  if (!existsSync(envPath)) {
    if (existsSync(examplePath)) {
      copyFileSync(examplePath, envPath);
      log("Created .env from .env.example — review secrets before production use.");
    } else {
      fail("Missing .env and .env.example. Add a root .env file.");
    }
  }

  const fileEnv = parseEnvFile(envPath);
  const missing = REQUIRED_ENV.filter((k) => !(process.env[k] || fileEnv[k]));
  if (missing.length) {
    fail(
      `Missing required env vars in .env: ${missing.join(", ")}\n` +
        `See .env.example for localhost defaults.`,
    );
  }

  for (const [k, v] of Object.entries(fileEnv)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

function waitForPort(host, port, name, timeoutMs = 60_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const socket = net.connect({ host, port }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(
            new Error(
              `Timed out waiting for ${name} at ${host}:${port} (${timeoutMs}ms)`,
            ),
          );
          return;
        }
        setTimeout(tryOnce, 1000);
      });
    };
    tryOnce();
  });
}

async function waitForInfra() {
  for (const t of WAIT_TARGETS) {
    log(`Waiting for ${t.name} (${t.host}:${t.port})...`);
    await waitForPort(t.host, t.port, t.name);
    log(`${t.name} is up.`);
  }
}

function compose(args) {
  if (commandExists("docker")) {
    const version = spawnSync("docker", ["compose", "version"], {
      encoding: "utf8",
      shell: isWin,
    });
    if (version.status === 0) {
      run("docker", ["compose", ...args]);
      return;
    }
  }
  if (commandExists("docker-compose")) {
    run("docker-compose", args);
    return;
  }
  fail(
    "Docker Compose not found. Install Docker Desktop or use --no-infra if infra is already running.",
  );
}

function startInfra(down) {
  if (down) {
    log("Stopping infra (docker compose down)...");
    compose(["down"]);
    log("Infra stopped.");
    return;
  }
  log("Starting infra (docker compose up -d)...");
  compose(["up", "-d"]);
  log("Infra containers started.");
}

function composeSupergraph() {
  log("Composing GraphQL supergraph (rover)...");
  const result = spawnSync("pnpm", ["run", "gql:compose"], {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
    shell: isWin,
  });
  if (result.status !== 0) {
    log(
      "Warning: gql:compose failed. Gateway may not start until supergraph is generated.",
    );
    return;
  }
  log("Supergraph written to services/gateway/supergraph.graphql");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  process.chdir(ROOT);

  if (opts.apps || (opts.infra && !opts.down)) {
    ensureEnv();
  }

  if (opts.infra) {
    if (
      !opts.skipComposeCheck &&
      !commandExists("docker") &&
      !commandExists("docker-compose")
    ) {
      fail(
        "Docker is required for infra. Install Docker Desktop or pass --no-infra.",
      );
    }
    startInfra(opts.down);
    if (opts.down && !opts.apps) {
      process.exit(0);
    }
    if (!opts.down && opts.apps) {
      try {
        await waitForInfra();
      } catch (e) {
        fail(e.message);
      }
    }
  }

  if (!opts.apps) {
    log("Done (infra only).");
    process.exit(0);
  }

  if (!opts.skipGql && opts.appsList.includes("gateway")) {
    composeSupergraph();
  }

  const projects = opts.appsList.join(",");
  log(`Starting apps via Nx: ${projects}`);
  log(
    "Press Ctrl+C to stop app processes (infra keeps running unless you use --down).",
  );

  const child = runAsync("pnpm", [
    "exec",
    "nx",
    "run-many",
    "-t",
    "dev",
    `--projects=${projects}`,
    "--parallel=10",
  ]);

  const shutdown = (signal) => {
    log(`Received ${signal}, stopping apps...`);
    if (child && !child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  child.on("exit", (code, signal) => {
    if (signal) {
      log(`Apps exited from signal ${signal}`);
      process.exit(0);
    }
    process.exit(code ?? 0);
  });

  child.on("error", (err) => {
    fail(err.message);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
