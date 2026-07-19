#!/usr/bin/env node
/**
 * Ensure a PR branch adds exactly one new Changeset file since a base ref.
 *
 * CI: PRs into development (see .github/workflows/changeset-required.yml)
 * Local: pnpm changeset:status
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);

const IGNORED = new Set([
  ".changeset/README.md",
  ".changeset/config.json",
]);

export const EXPECTED_CHANGESET_COUNT = 1;

export type ChangesetCountVerdict =
  | { readonly ok: true; readonly files: readonly string[] }
  | {
      readonly ok: false;
      readonly reason: "none" | "multiple";
      readonly files: readonly string[];
    };

export function evaluateChangesetCount(
  files: readonly string[],
): ChangesetCountVerdict {
  if (files.length === EXPECTED_CHANGESET_COUNT) {
    return { ok: true, files };
  }
  if (files.length === 0) {
    return { ok: false, reason: "none", files };
  }
  return { ok: false, reason: "multiple", files };
}

async function runGit(args: readonly string[], cwd: string): Promise<string> {
  const { stdout } = await execFileAsync("git", [...args], {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  return stdout.trim();
}

export async function listNewChangesets(
  cwd: string,
  baseRef: string,
): Promise<string[]> {
  const raw = await runGit(
    [
      "diff",
      "--name-only",
      "--diff-filter=A",
      `${baseRef}...HEAD`,
      "--",
      ".changeset",
    ],
    cwd,
  );

  if (raw.length === 0) {
    return [];
  }

  return raw
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/\\/g, "/"))
    .filter((line) => line.length > 0)
    .filter((line) => line.startsWith(".changeset/"))
    .filter((line) => line.endsWith(".md"))
    .filter((line) => !IGNORED.has(line));
}

function formatFailure(
  baseRef: string,
  verdict: Extract<ChangesetCountVerdict, { ok: false }>,
): string {
  if (verdict.reason === "none") {
    return (
      `Expected exactly ${EXPECTED_CHANGESET_COUNT} new Changeset file since ${baseRef}, found 0.\n\n` +
      `Add one:\n` +
      `  pnpm changeset\n` +
      `  git add .changeset && git commit -m "chore: add changeset"\n\n` +
      `Or mark the PR with label "skip-changeset" if no release notes are needed.`
    );
  }

  const listed = verdict.files.map((f) => `  - ${f}`).join("\n");
  return (
    `Expected exactly ${EXPECTED_CHANGESET_COUNT} new Changeset file since ${baseRef}, ` +
    `found ${verdict.files.length}.\n\n` +
    `New changeset files:\n${listed}\n\n` +
    `One PR / feature should have a single changeset.\n` +
    `Keep one file and remove extras:\n` +
    `  git rm .changeset/<extra-name>.md\n`
  );
}

export async function main(
  argv: readonly string[] = process.argv.slice(2),
): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`Usage: require-changeset [base-ref]

Default base-ref: origin/development

Exits 0 when HEAD adds exactly one new .changeset/*.md file since the base.
Exits 1 when there are zero or more than one.

Skip in CI: add the PR label "skip-changeset".
`);
    return 0;
  }

  const baseRef = argv[0] ?? "origin/development";
  const cwd = process.cwd();

  try {
    await runGit(["rev-parse", "--verify", baseRef], cwd);
  } catch {
    console.error(
      `Base ref not found: ${baseRef}\n` +
        `Fetch it first, e.g. git fetch origin development`,
    );
    return 1;
  }

  try {
    try {
      await runGit(["merge-base", baseRef, "HEAD"], cwd);
    } catch {
      console.error(
        `No merge base between HEAD and ${baseRef}.\n` +
          `Rebase or merge ${baseRef} into your branch, then retry.`,
      );
      return 1;
    }

    const files = await listNewChangesets(cwd, baseRef);
    const verdict = evaluateChangesetCount(files);

    if (!verdict.ok) {
      console.error(formatFailure(baseRef, verdict));
      return 1;
    }

    console.log(
      `OK: exactly ${EXPECTED_CHANGESET_COUNT} new changeset since ${baseRef}:`,
    );
    for (const file of verdict.files) {
      console.log(`  - ${file}`);
    }
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to check changesets: ${message}`);
    return 1;
  }
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  try {
    return import.meta.url === pathToFileURL(entry).href;
  } catch {
    return entry.replace(/\\/g, "/").endsWith("/scripts/require-changeset.ts");
  }
}

if (isMainModule()) {
  main().then((code) => {
    process.exitCode = code;
  });
}
