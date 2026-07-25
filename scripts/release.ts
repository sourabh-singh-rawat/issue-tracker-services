#!/usr/bin/env node
/**
 * After a release/* branch is merged into main:
 * 1. Parse product release id from the branch (vYYYY.MM.DD.N)
 * 2. Tag the merge commit
 * 3. Create a GitHub Release for that tag
 *
 * Usage (CI):
 *   RELEASE_BRANCH=release/2026.08.01.1 \
 *   MERGE_SHA=<sha> \
 *   node --no-warnings --experimental-strip-types scripts/release.ts
 *
 * Optional: PR_TITLE, PR_BODY, PR_NUMBER, PR_URL for release notes.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";
import {
  formatReleaseBranchExample,
  formatReleaseTagExample,
  parseReleaseBranch,
} from "./release-version.ts";

const execFileAsync = promisify(execFile);

async function run(
  command: string,
  args: readonly string[],
  opts: { cwd?: string; env?: NodeJS.ProcessEnv } = {},
): Promise<{ stdout: string; stderr: string }> {
  const { stdout, stderr } = await execFileAsync(command, [...args], {
    cwd: opts.cwd ?? process.cwd(),
    env: { ...process.env, ...opts.env },
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

async function git(
  args: readonly string[],
  cwd: string,
): Promise<string> {
  const { stdout } = await run("git", args, { cwd });
  return stdout;
}

async function tagExists(tag: string, cwd: string): Promise<boolean> {
  try {
    await git(["rev-parse", "--verify", `refs/tags/${tag}`], cwd);
    return true;
  } catch {
    return false;
  }
}

async function releaseExists(tag: string, cwd: string): Promise<boolean> {
  try {
    await run("gh", ["release", "view", tag], { cwd });
    return true;
  } catch {
    return false;
  }
}

async function listReleaseTagsNewestFirst(cwd: string): Promise<string[]> {
  try {
    const out = await git(
      ["tag", "--list", "v20*.*.*.*", "--sort=-v:refname"],
      cwd,
    );
    if (out.length === 0) {
      return [];
    }
    return out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch {
    return [];
  }
}

async function commitLogSince(
  cwd: string,
  fromTag: string | null,
  toSha: string,
  limit = 100,
): Promise<string> {
  const range = fromTag === null ? toSha : `${fromTag}..${toSha}`;
  try {
    return await git(
      [
        "log",
        range,
        `--max-count=${limit}`,
        "--pretty=format:- %s (%h)",
        "--no-merges",
      ],
      cwd,
    );
  } catch {
    return "";
  }
}

export function buildReleaseNotes(input: {
  tag: string;
  releaseBranch: string;
  prTitle: string;
  prBody: string;
  prNumber: string;
  prUrl: string;
  commitLog: string;
}): string {
  const lines: string[] = [];
  lines.push(`## ${input.tag}`);
  lines.push("");

  if (input.prTitle.length > 0) {
    const prLink =
      input.prNumber.length > 0 && input.prUrl.length > 0
        ? `[#${input.prNumber}](${input.prUrl})`
        : input.prNumber.length > 0
          ? `#${input.prNumber}`
          : "";
    lines.push(
      prLink.length > 0
        ? `**${input.prTitle}** (${prLink})`
        : `**${input.prTitle}**`,
    );
    lines.push("");
  }

  const body = input.prBody.trim();
  if (body.length > 0) {
    lines.push(body);
    lines.push("");
  }

  lines.push(`Merged from \`${input.releaseBranch}\`.`);
  lines.push("");

  if (input.commitLog.length > 0) {
    lines.push("### Commits");
    lines.push("");
    lines.push(input.commitLog);
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

export async function main(
  argv: readonly string[] = process.argv.slice(2),
): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`Usage: release

Tags the merge commit and creates a GitHub Release using product calver:
  ${formatReleaseTagExample()}

Required env:
  RELEASE_BRANCH   e.g. ${formatReleaseBranchExample()}
  MERGE_SHA        merge commit on main (or omit to use HEAD)

Optional env:
  PR_TITLE, PR_BODY, PR_NUMBER, PR_URL
  GH_TOKEN / GITHUB_TOKEN  (required for gh release create)
  DRY_RUN=1                print actions without tagging/publishing
`);
    return 0;
  }

  const cwd = process.cwd();
  const releaseBranch = process.env.RELEASE_BRANCH?.trim() ?? "";
  if (releaseBranch.length === 0) {
    console.error(
      `Missing RELEASE_BRANCH (e.g. ${formatReleaseBranchExample()}).`,
    );
    return 1;
  }

  const tag = parseReleaseBranch(releaseBranch);
  if (tag === null) {
    console.error(
      `Invalid release branch. Expected release/{YYYY.MM.DD.N} (e.g. ${formatReleaseBranchExample()} → ${formatReleaseTagExample()}). Got: ${releaseBranch}`,
    );
    return 1;
  }

  let mergeSha = process.env.MERGE_SHA?.trim() ?? "";
  if (mergeSha.length === 0) {
    mergeSha = await git(["rev-parse", "HEAD"], cwd);
  } else {
    mergeSha = await git(["rev-parse", "--verify", mergeSha], cwd);
  }

  const dryRun = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
  const prTitle = process.env.PR_TITLE?.trim() ?? "";
  const prBody = process.env.PR_BODY ?? "";
  const prNumber = process.env.PR_NUMBER?.trim() ?? "";
  const prUrl = process.env.PR_URL?.trim() ?? "";

  const sinceTag =
    (await listReleaseTagsNewestFirst(cwd)).find((t) => t !== tag) ?? null;

  const commitLog = await commitLogSince(cwd, sinceTag, mergeSha);
  const notes = buildReleaseNotes({
    tag,
    releaseBranch,
    prTitle,
    prBody,
    prNumber,
    prUrl,
    commitLog,
  });

  console.log(`Release tag: ${tag}`);
  console.log(`Merge SHA:   ${mergeSha}`);
  console.log(`Since tag:   ${sinceTag ?? "(none)"}`);
  console.log("--- notes ---");
  console.log(notes);
  console.log("-------------");

  if (dryRun) {
    console.log("DRY_RUN=1 — skipping tag and GitHub Release.");
    return 0;
  }

  if (await tagExists(tag, cwd)) {
    console.error(`Tag ${tag} already exists. Refusing to overwrite.`);
    return 1;
  }

  if (await releaseExists(tag, cwd)) {
    console.error(`GitHub Release ${tag} already exists. Refusing to overwrite.`);
    return 1;
  }

  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "";
  if (token.length === 0) {
    console.error("Missing GH_TOKEN or GITHUB_TOKEN for creating the release.");
    return 1;
  }

  console.log(`Creating annotated tag ${tag} at ${mergeSha}…`);
  await git(["tag", "-a", tag, "-m", tag, mergeSha], cwd);
  await git(["push", "origin", `refs/tags/${tag}`], cwd);

  console.log(`Creating GitHub Release ${tag}…`);
  await run(
    "gh",
    [
      "release",
      "create",
      tag,
      "--target",
      mergeSha,
      "--title",
      tag,
      "--notes",
      notes,
    ],
    { cwd, env: { GH_TOKEN: token, GITHUB_TOKEN: token } },
  );

  console.log(`OK: published ${tag}`);
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
    return entry.replace(/\\/g, "/").endsWith("/scripts/release.ts");
  }
}

if (isMainModule()) {
  main().then((code) => {
    process.exitCode = code;
  });
}
