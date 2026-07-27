#!/usr/bin/env node
/**
 * Create the next calver release branch: release/YYYY.MM.DD.N
 *
 * Picks N by scanning local + remote release branches and v* tags for today
 * (or --date). Branches from development by default.
 *
 * Usage:
 *   pnpm create-release-branch
 *   pnpm create-release-branch --push
 *   pnpm create-release-branch --base main --dry-run
 *   pnpm create-release-branch --date 2026.07.23
 *   pnpm create-release-branch release/2026.07.23.2
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";
import {
  calendarDateParts,
  formatReleaseBranch,
  formatReleaseBranchExample,
  formatReleaseTag,
  formatReleaseTagExample,
  nextReleaseVersion,
  normalizeReleaseTag,
  parseReleaseBranch,
  parseReleaseVersionParts,
  type ReleaseVersionParts,
} from "./release-version.ts";

const execFileAsync = promisify(execFile);

async function run(
  command: string,
  args: readonly string[],
  opts: { cwd?: string } = {},
): Promise<{ stdout: string; stderr: string }> {
  const { stdout, stderr } = await execFileAsync(command, [...args], {
    cwd: opts.cwd ?? process.cwd(),
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

async function git(args: readonly string[], cwd: string): Promise<string> {
  const { stdout } = await run("git", args, { cwd });
  return stdout;
}

function splitLines(out: string): string[] {
  if (out.length === 0) {
    return [];
  }
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

type CliOptions = {
  readonly help: boolean;
  readonly dryRun: boolean;
  readonly push: boolean;
  readonly base: string;
  /** Explicit branch or version if provided positionally */
  readonly explicit: string | null;
  /** Override calendar day: YYYY.MM.DD or YYYY-MM-DD */
  readonly date: string | null;
};

function printHelp(): void {
  console.log(`Usage: create-release-branch [options] [release/YYYY.MM.DD.N]

Creates the next product release branch (calver):
  ${formatReleaseBranchExample()}  → tag ${formatReleaseTagExample()}

Options:
  --base <branch>   Branch point (default: development)
  --date YYYY.MM.DD Use this calendar day instead of today (sequence still auto)
  --push            Push the new branch and set upstream
  --dry-run         Print planned branch without creating it
  -h, --help        Show this help

Examples:
  pnpm create-release-branch
  pnpm create-release-branch --push
  pnpm create-release-branch --base main --dry-run
  pnpm create-release-branch --date 2026.07.23
  pnpm create-release-branch release/2026.07.23.2 --push
`);
}

function parseArgs(argv: readonly string[]): CliOptions | { error: string } {
  let help = false;
  let dryRun = false;
  let push = false;
  let base = "development";
  let explicit: string | null = null;
  let date: string | null = null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === "-h" || arg === "--help") {
      help = true;
      continue;
    }
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    if (arg === "--push") {
      push = true;
      continue;
    }
    if (arg === "--base") {
      const value = argv[++i];
      if (value === undefined || value.startsWith("-")) {
        return { error: "--base requires a branch name" };
      }
      base = value;
      continue;
    }
    if (arg.startsWith("--base=")) {
      base = arg.slice("--base=".length);
      if (base.length === 0) {
        return { error: "--base requires a branch name" };
      }
      continue;
    }
    if (arg === "--date") {
      const value = argv[++i];
      if (value === undefined || value.startsWith("-")) {
        return { error: "--date requires YYYY.MM.DD" };
      }
      date = value;
      continue;
    }
    if (arg.startsWith("--date=")) {
      date = arg.slice("--date=".length);
      if (date.length === 0) {
        return { error: "--date requires YYYY.MM.DD" };
      }
      continue;
    }
    if (arg.startsWith("-")) {
      return { error: `Unknown option: ${arg}` };
    }
    if (explicit !== null) {
      return { error: `Unexpected extra argument: ${arg}` };
    }
    explicit = arg;
  }

  return { help, dryRun, push, base, explicit, date };
}

function parseDateOverride(
  input: string,
): Pick<ReleaseVersionParts, "year" | "month" | "day"> | null {
  const normalized = input.trim().replace(/-/g, ".");
  // Accept YYYY.MM.DD (no sequence) by appending .1 for the regex
  const withSeq = RELEASE_DATE_ONLY_RE.test(normalized) ? `${normalized}.1` : normalized;
  const parts = parseReleaseVersionParts(withSeq);
  if (parts === null) {
    return null;
  }
  return { year: parts.year, month: parts.month, day: parts.day };
}

const RELEASE_DATE_ONLY_RE = /^(20\d{2})\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;

function resolveExplicit(explicit: string): ReleaseVersionParts | null {
  const asBranch = parseReleaseBranch(explicit);
  if (asBranch !== null) {
    return parseReleaseVersionParts(asBranch);
  }
  const asTag = normalizeReleaseTag(explicit);
  if (asTag !== null) {
    return parseReleaseVersionParts(asTag);
  }
  return null;
}

async function collectKnownRefs(cwd: string): Promise<string[]> {
  // Best-effort fetch so remote release/* and tags are visible.
  try {
    await git(["fetch", "--tags", "--prune", "origin"], cwd);
  } catch {
    // Offline / no origin — continue with local refs only.
  }

  const refs: string[] = [];

  try {
    refs.push(...splitLines(await git(["tag", "--list", "v20*.*.*.*"], cwd)));
  } catch {
    // ignore
  }

  try {
    refs.push(
      ...splitLines(await git(["branch", "--list", "release/*", "--format=%(refname:short)"], cwd)),
    );
  } catch {
    // ignore
  }

  try {
    refs.push(
      ...splitLines(
        await git(["branch", "-r", "--list", "*/release/*", "--format=%(refname:short)"], cwd),
      ).map((name) => name.replace(/^origin\//, "")),
    );
  } catch {
    // ignore
  }

  return refs;
}

async function refExists(cwd: string, ref: string): Promise<boolean> {
  try {
    await git(["rev-parse", "--verify", "--quiet", ref], cwd);
    return true;
  } catch {
    return false;
  }
}

async function resolveBaseRef(cwd: string, base: string): Promise<string | null> {
  const candidates = [base, `refs/heads/${base}`, `origin/${base}`, `refs/remotes/origin/${base}`];
  for (const candidate of candidates) {
    if (await refExists(cwd, candidate)) {
      return candidate;
    }
  }
  return null;
}

export async function main(argv: readonly string[] = process.argv.slice(2)): Promise<number> {
  const parsed = parseArgs(argv);
  if ("error" in parsed) {
    console.error(parsed.error);
    printHelp();
    return 1;
  }

  if (parsed.help) {
    printHelp();
    return 0;
  }

  const cwd = process.cwd();
  let parts: ReleaseVersionParts;

  if (parsed.explicit !== null) {
    const resolved = resolveExplicit(parsed.explicit);
    if (resolved === null) {
      console.error(
        `Invalid release id. Expected ${formatReleaseBranchExample()} or ${formatReleaseTagExample()}. Got: ${parsed.explicit}`,
      );
      return 1;
    }
    parts = resolved;
  } else {
    let day = calendarDateParts();
    if (parsed.date !== null) {
      const override = parseDateOverride(parsed.date);
      if (override === null) {
        console.error(`Invalid --date. Expected YYYY.MM.DD (e.g. 2026.07.23). Got: ${parsed.date}`);
        return 1;
      }
      day = override;
    }
    const known = await collectKnownRefs(cwd);
    parts = nextReleaseVersion(known, day);
  }

  const branch = formatReleaseBranch(parts);
  const tag = formatReleaseTag(parts);

  if (await refExists(cwd, `refs/heads/${branch}`)) {
    console.error(`Local branch already exists: ${branch}`);
    return 1;
  }
  if (await refExists(cwd, `refs/remotes/origin/${branch}`)) {
    console.error(`Remote branch already exists: origin/${branch}`);
    return 1;
  }
  if (await refExists(cwd, `refs/tags/${tag}`)) {
    console.error(`Tag already exists: ${tag}`);
    return 1;
  }

  const baseRef = await resolveBaseRef(cwd, parsed.base);
  if (baseRef === null) {
    console.error(`Base branch not found locally or on origin: ${parsed.base}`);
    return 1;
  }

  console.log(`Release branch: ${branch}`);
  console.log(`Release tag:    ${tag}  (created later by merge → main)`);
  console.log(`Base:           ${baseRef}`);

  if (parsed.dryRun) {
    console.log("DRY_RUN — not creating branch.");
    return 0;
  }

  await git(["switch", "-c", branch, baseRef], cwd);
  console.log(`Created and switched to ${branch}`);

  if (parsed.push) {
    await git(["push", "-u", "origin", branch], cwd);
    console.log(`Pushed origin/${branch}`);
  } else {
    console.log(`Next: git push -u origin ${branch}`);
    console.log(`Then open a PR into main (not development). Merge creates tag ${tag}.`);
  }

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
    return entry.replace(/\\/g, "/").endsWith("/tools/scripts/create-release-branch.ts");
  }
}

if (isMainModule()) {
  main().then((code) => {
    process.exitCode = code;
  });
}
