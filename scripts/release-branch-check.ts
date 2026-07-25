#!/usr/bin/env node
/**
 * Validate a release/* branch before merging into main.
 *
 * Checks:
 * - Branch name is release/{YYYY.MM.DD.N} (optional leading v on the version)
 * - No unconsumed Changeset files remain under .changeset/
 *
 * Usage: release-branch-check [release/2026.08.01.1]
 * Env:   RELEASE_BRANCH=release/2026.08.01.1
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  formatReleaseBranchExample,
  formatReleaseTagExample,
  parseReleaseBranch,
} from "./release-version.ts";

const CHANGESET_IGNORED = new Set([
  ".changeset/README.md",
  ".changeset/config.json",
]);

function isDirectory(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

export function listPendingChangesets(cwd: string): string[] {
  const dir = path.join(cwd, ".changeset");
  if (!isDirectory(dir)) {
    return [];
  }

  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return names
    .filter((name) => name.endsWith(".md"))
    .map((name) => `.changeset/${name}`)
    .filter((rel) => !CHANGESET_IGNORED.has(rel))
    .sort();
}

export type ValidationResult =
  | { readonly ok: true; readonly tag: string }
  | { readonly ok: false; readonly errors: readonly string[] };

export function validateReleaseBranch(
  cwd: string,
  releaseBranch: string,
): ValidationResult {
  const errors: string[] = [];

  const tag = parseReleaseBranch(releaseBranch);
  if (tag === null) {
    errors.push(
      `Branch must be release/{YYYY.MM.DD.N} (e.g. ${formatReleaseBranchExample()} → tag ${formatReleaseTagExample()}). Got: ${releaseBranch}`,
    );
    return { ok: false, errors };
  }

  const pending = listPendingChangesets(cwd);
  if (pending.length > 0) {
    errors.push(
      `Unconsumed Changeset file(s) still present (run pnpm changeset:version first):\n` +
        pending.map((f) => `  - ${f}`).join("\n"),
    );
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, tag };
}

export async function main(
  argv: readonly string[] = process.argv.slice(2),
): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`Usage: release-branch-check [${formatReleaseBranchExample()}]

Validates a release/* branch before merge into main:
  - Branch name is release/{YYYY.MM.DD.N} (tag will be ${formatReleaseTagExample()})
  - No unconsumed .changeset/*.md files remain

Branch can also be passed as RELEASE_BRANCH.
`);
    return 0;
  }

  const releaseBranch = argv[0] ?? process.env.RELEASE_BRANCH ?? "";
  if (releaseBranch.length === 0) {
    console.error(
      `Missing release branch. Pass ${formatReleaseBranchExample()} as an argument or set RELEASE_BRANCH.`,
    );
    return 1;
  }

  const cwd = process.cwd();
  const result = validateReleaseBranch(cwd, releaseBranch);

  if (!result.ok) {
    console.error("Release branch validation failed:\n");
    for (const error of result.errors) {
      console.error(`• ${error}\n`);
    }
    return 1;
  }

  console.log(`OK: release branch is valid for tag ${result.tag}`);
  return 0;
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  try {
    return import.meta.url === pathToFileURL(entry).href;
  } catch {
    return entry
      .replace(/\\/g, "/")
      .endsWith("/scripts/release-branch-check.ts");
  }
}

if (isMainModule()) {
  main().then((code) => {
    process.exitCode = code;
  });
}
