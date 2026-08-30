#!/usr/bin/env node

import { execFile } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import {
  entriesDeletedAtCommit,
  listHistoricalReleases,
  packageVersionsFor,
} from "../changelog/entries.ts";
import {
  diffPackageVersions,
  extractChangelogSection,
  formatChangelogSection,
} from "../changelog/format.ts";
import {
  formatReleaseBranchExample,
  formatReleaseTagExample,
  parseReleaseBranch,
} from "./release-version.ts";

const execFileAsync = promisify(execFile);

const run = async (
  command: string,
  args: readonly string[],
  opts: { cwd?: string; env?: NodeJS.ProcessEnv } = {},
): Promise<{ stdout: string; stderr: string }> => {
  const { stdout, stderr } = await execFileAsync(command, [...args], {
    cwd: opts.cwd ?? process.cwd(),
    env: { ...process.env, ...opts.env },
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
};

const git = async (args: readonly string[], cwd: string): Promise<string> => {
  const { stdout } = await run("git", args, { cwd });
  return stdout;
};

const gitShow = async (cwd: string, spec: string): Promise<string | null> => {
  try {
    return await git(["show", spec], cwd);
  } catch {
    return null;
  }
};

const tagExists = async (tag: string, cwd: string): Promise<boolean> => {
  try {
    await git(["rev-parse", "--verify", `refs/tags/${tag}`], cwd);
    return true;
  } catch {
    return false;
  }
};

const releaseExists = async (tag: string, cwd: string): Promise<boolean> => {
  try {
    await run("gh", ["release", "view", tag], { cwd });
    return true;
  } catch {
    return false;
  }
};

const listGithubReleaseTags = async (cwd: string): Promise<string[]> => {
  try {
    const { stdout } = await run(
      "gh",
      ["release", "list", "--limit", "100", "--json", "tagName", "--jq", ".[].tagName"],
      { cwd },
    );
    if (stdout.length === 0) {
      return [];
    }
    return stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch {
    return [];
  }
};

const readChangelogAt = async (cwd: string, commit: string | null): Promise<string> => {
  if (commit !== null) {
    const fromGit = await gitShow(cwd, `${commit}:CHANGELOG.md`);
    if (fromGit !== null) {
      return fromGit;
    }
  }
  const path = join(cwd, "CHANGELOG.md");
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

export const buildReleaseNotes = (input: {
  readonly tag: string;
  readonly releaseBranch: string;
  readonly prNumber: string;
  readonly prUrl: string;
  readonly section: string;
}): string => {
  const lines: string[] = [input.section.trimEnd(), ""];

  lines.push(`Merged from \`${input.releaseBranch}\`.`);

  if (input.prNumber.length > 0) {
    const prLink =
      input.prUrl.length > 0 ? `[#${input.prNumber}](${input.prUrl})` : `#${input.prNumber}`;
    lines.push(`Release PR: ${prLink}.`);
  }

  lines.push("");
  return `${lines.join("\n").trimEnd()}\n`;
};

const resolveSectionNotes = async (input: {
  readonly cwd: string;
  readonly tag: string;
  readonly mergeSha: string | null;
}): Promise<string | null> => {
  const changelog = await readChangelogAt(input.cwd, input.mergeSha);
  const fromFile = extractChangelogSection(changelog, input.tag);
  if (fromFile !== null) {
    return fromFile;
  }

  if (input.mergeSha === null) {
    return null;
  }

  const entries = await entriesDeletedAtCommit(input.cwd, input.mergeSha);
  if (entries.length === 0) {
    return null;
  }
  const history = await listHistoricalReleases(input.cwd);
  const previous = history.find((drop) => drop.tag !== input.tag) ?? null;
  const currentVersions = await packageVersionsFor(input.cwd, input.mergeSha);
  const previousVersions =
    previous === null ? null : await packageVersionsFor(input.cwd, previous.commit);
  const changed = diffPackageVersions(currentVersions, previousVersions);
  return formatChangelogSection(input.tag, entries, changed);
};

const writeNotesFile = (notes: string): string => {
  const path = join(tmpdir(), `pine-release-notes-${process.pid}.md`);
  writeFileSync(path, notes, "utf8");
  return path;
};

const editGithubReleaseNotes = async (input: {
  readonly cwd: string;
  readonly tag: string;
  readonly notes: string;
  readonly token: string;
}): Promise<void> => {
  const notesFile = writeNotesFile(input.notes);
  await run("gh", ["release", "edit", input.tag, "--notes-file", notesFile], {
    cwd: input.cwd,
    env: { GH_TOKEN: input.token, GITHUB_TOKEN: input.token },
  });
};

const resolveGithubToken = async (cwd: string): Promise<string> => {
  const fromEnv = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "";
  if (fromEnv.length > 0) {
    return fromEnv;
  }
  try {
    const { stdout } = await run("gh", ["auth", "token"], { cwd });
    return stdout.trim();
  } catch {
    return "";
  }
};

const syncExistingReleaseNotes = async (cwd: string, dryRun: boolean): Promise<number> => {
  const token = dryRun ? "" : await resolveGithubToken(cwd);
  if (!dryRun && token.length === 0) {
    console.error("Missing GH_TOKEN / GITHUB_TOKEN (or `gh auth login`) for editing releases.");
    return 1;
  }

  const tags = await listGithubReleaseTags(cwd);
  if (tags.length === 0) {
    console.error("No GitHub releases found.");
    return 1;
  }

  let updated = 0;
  let skipped = 0;

  for (const tag of tags) {
    const section = await resolveSectionNotes({ cwd, tag, mergeSha: null });
    if (section === null) {
      console.log(`skip ${tag}: no CHANGELOG section / recoverable changesets`);
      skipped += 1;
      continue;
    }

    const notes = buildReleaseNotes({
      tag,
      releaseBranch: `release/${tag.startsWith("v") ? tag.slice(1) : tag}`,
      prNumber: "",
      prUrl: "",
      section,
    });

    console.log(`--- ${tag} ---`);
    console.log(notes);

    if (dryRun) {
      updated += 1;
      continue;
    }

    await editGithubReleaseNotes({ cwd, tag, notes, token });
    console.log(`updated ${tag}`);
    updated += 1;
  }

  console.log(`Done: ${updated} updated, ${skipped} skipped.`);
  return 0;
};

const printHelp = (): void => {
  console.log(`Usage: release [--sync-notes]

Tags the merge commit and creates a GitHub Release using product calver:
  ${formatReleaseTagExample()}

Release notes come from the matching ## ${formatReleaseTagExample()} section in
CHANGELOG.md (changeset Minor/Patch bodies). Falls back to recovering deleted
.changeset files from the merge/release commit.

Required env (create mode):
  RELEASE_BRANCH   e.g. ${formatReleaseBranchExample()}
  MERGE_SHA        merge commit on main (or omit to use HEAD)

Optional env:
  PR_NUMBER, PR_URL
  GH_TOKEN / GITHUB_TOKEN  (required for gh release create/edit)
  DRY_RUN=1                print actions without tagging/publishing

Flags:
  --sync-notes             Update existing GitHub Release bodies from CHANGELOG.md
  -h, --help               Show this help
`);
};

export const main = async (argv: readonly string[] = process.argv.slice(2)): Promise<number> => {
  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    return 0;
  }

  const cwd = process.cwd();
  const dryRun = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

  if (argv.includes("--sync-notes")) {
    return syncExistingReleaseNotes(cwd, dryRun);
  }

  const releaseBranch = process.env.RELEASE_BRANCH?.trim() ?? "";
  if (releaseBranch.length === 0) {
    console.error(`Missing RELEASE_BRANCH (e.g. ${formatReleaseBranchExample()}).`);
    return 1;
  }

  const version = parseReleaseBranch(releaseBranch);
  if (version === null) {
    console.error(
      `Invalid release branch. Expected release/{YYYY.MM.DD.N} (e.g. ${formatReleaseBranchExample()} → ${formatReleaseTagExample()}). Got: ${releaseBranch}`,
    );
    return 1;
  }
  const tag = `v${version}`;

  let mergeSha = process.env.MERGE_SHA?.trim() ?? "";
  if (mergeSha.length === 0) {
    mergeSha = await git(["rev-parse", "HEAD"], cwd);
  } else {
    mergeSha = await git(["rev-parse", "--verify", mergeSha], cwd);
  }

  const prNumber = process.env.PR_NUMBER?.trim() ?? "";
  const prUrl = process.env.PR_URL?.trim() ?? "";

  const section = await resolveSectionNotes({ cwd, tag, mergeSha });
  if (section === null) {
    console.error(
      `No release notes for ${tag}: CHANGELOG.md has no section and no deleted changesets were found at ${mergeSha}.`,
    );
    return 1;
  }

  const notes = buildReleaseNotes({
    tag,
    releaseBranch,
    prNumber,
    prUrl,
    section,
  });

  console.log(`Release tag: ${tag}`);
  console.log(`Merge SHA:   ${mergeSha}`);
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

  const token = await resolveGithubToken(cwd);
  if (token.length === 0) {
    console.error("Missing GH_TOKEN / GITHUB_TOKEN (or `gh auth login`) for creating the release.");
    return 1;
  }

  console.log(`Creating annotated tag ${tag} at ${mergeSha}…`);
  await git(["tag", "-a", tag, "-m", tag, mergeSha], cwd);
  await git(["push", "origin", `refs/tags/${tag}`], cwd);

  console.log(`Creating GitHub Release ${tag}…`);
  const notesFile = writeNotesFile(notes);
  await run(
    "gh",
    ["release", "create", tag, "--target", mergeSha, "--title", tag, "--notes-file", notesFile],
    { cwd, env: { GH_TOKEN: token, GITHUB_TOKEN: token } },
  );

  console.log(`OK: published ${tag}`);
  return 0;
};

const isMainModule = (): boolean => {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  try {
    return import.meta.url === pathToFileURL(entry).href;
  } catch {
    return entry.replace(/\\/g, "/").endsWith("/tools/scripts/release/release.ts");
  }
};

if (isMainModule()) {
  void main().then((code) => {
    process.exitCode = code;
  });
}
