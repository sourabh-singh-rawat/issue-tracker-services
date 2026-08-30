import { execFile } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";
import {
  type ChangelogEntry,
  type ParsedChangeset,
  isChangesetMarkdownPath,
  isSkippedChangesetFile,
  parseChangesetMarkdown,
  parseReleaseCommitSubject,
  versionsForChangeset,
} from "./format.ts";
import { packageVersionsAt } from "./packages.ts";

const execFileAsync = promisify(execFile);

export type HistoricalRelease = {
  readonly tag: string;
  readonly commit: string;
  readonly committedAt: string;
};

export const git = async (args: readonly string[], cwd: string): Promise<string> => {
  const { stdout } = await execFileAsync("git", [...args], {
    cwd,
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return stdout.trim();
};

export const listPendingChangesetFiles = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return [];
  }
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !isSkippedChangesetFile(name))
    .sort();
};

export const entriesForCurrentDrop = async (
  cwd: string,
  changesetDir: string,
): Promise<ChangelogEntry[]> => {
  const knownWorkingTree = await versionsAt(cwd, null);
  const pendingFiles = listPendingChangesetFiles(changesetDir);

  if (pendingFiles.length > 0) {
    return entriesFromWorkingTree(cwd, changesetDir, pendingFiles, knownWorkingTree);
  }

  const deleted = await uncommittedDeletedChangesetPaths(cwd);
  if (deleted.length > 0) {
    return entriesFromGitPaths({
      cwd,
      paths: deleted,
      contentSpec: (path) => `HEAD:${path}`,
      attributionAt: "HEAD",
      knownVersions: knownWorkingTree,
      mode: "released",
    });
  }

  let head = "";
  let subject = "";
  try {
    head = await git(["rev-parse", "HEAD"], cwd);
    subject = await git(["log", "-1", "--format=%s"], cwd);
  } catch {
    return [];
  }

  if (parseReleaseCommitSubject(subject) !== null) {
    return entriesDeletedAtCommit(cwd, head);
  }
  return [];
};

export const entriesDeletedAtCommit = async (
  cwd: string,
  commit: string,
): Promise<ChangelogEntry[]> => {
  let paths: string[] = [];
  try {
    paths = splitLines(
      await git(
        ["diff-tree", "--no-commit-id", "--name-only", "--diff-filter=D", "-r", commit],
        cwd,
      ),
    );
  } catch {
    return [];
  }

  return entriesFromGitPaths({
    cwd,
    paths,
    contentSpec: (path) => `${commit}^:${path}`,
    attributionAt: `${commit}^`,
    knownVersions: await versionsAt(cwd, commit),
    mode: "released",
  });
};

export const listHistoricalReleases = async (cwd: string): Promise<HistoricalRelease[]> => {
  const raw = await git(
    [
      "log",
      "--all",
      "--format=%H%x09%s%x09%cI",
      "--grep=^chore(release)",
      "--grep=^chore: release",
      "--grep=^chore: publish",
    ],
    cwd,
  );

  const candidates = new Map<string, HistoricalRelease[]>();
  for (const line of splitLines(raw)) {
    const [commit, subject, committedAt] = line.split("\t");
    if (commit === undefined || subject === undefined || committedAt === undefined) {
      continue;
    }
    const tag = parseReleaseCommitSubject(subject);
    if (tag === null) {
      continue;
    }
    const list = candidates.get(tag) ?? [];
    list.push({ tag, commit, committedAt });
    candidates.set(tag, list);
  }

  const selected: HistoricalRelease[] = [];
  for (const [tag, list] of candidates) {
    const preferred = await pickReleaseCommit(cwd, list);
    if (preferred !== null) {
      selected.push({ ...preferred, tag });
    }
  }

  return selected.sort((a, b) => b.committedAt.localeCompare(a.committedAt));
};

const pickReleaseCommit = async (
  cwd: string,
  candidates: readonly HistoricalRelease[],
): Promise<HistoricalRelease | null> => {
  if (candidates.length === 0) {
    return null;
  }

  const ranked = [...candidates].sort((a, b) => b.committedAt.localeCompare(a.committedAt));
  for (const candidate of ranked) {
    if (await commitDeletesChangesets(cwd, candidate.commit)) {
      return candidate;
    }
  }
  return ranked[0] ?? null;
};

const commitDeletesChangesets = async (cwd: string, commit: string): Promise<boolean> => {
  try {
    const paths = splitLines(
      await git(
        ["diff-tree", "--no-commit-id", "--name-only", "--diff-filter=D", "-r", commit],
        cwd,
      ),
    );
    return paths.some((path) => isChangesetMarkdownPath(path));
  } catch {
    return false;
  }
};

const splitLines = (out: string): string[] => {
  if (out.length === 0) {
    return [];
  }
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

const gitLines = async (args: readonly string[], cwd: string): Promise<string[]> =>
  splitLines(await git(args, cwd));

const gitShow = async (cwd: string, spec: string): Promise<string | null> => {
  try {
    return await git(["show", spec], cwd);
  } catch {
    return null;
  }
};

export const packageVersionsFor = (
  cwd: string,
  commit: string | null,
): Promise<Map<string, string>> => packageVersionsAt(cwd, commit, gitShow, gitLines);

const versionsAt = (cwd: string, commit: string | null): Promise<Map<string, string>> =>
  packageVersionsFor(cwd, commit);

const uniqueSorted = (names: readonly string[]): string[] =>
  [...new Set(names.map((name) => name.trim()).filter((name) => name.length > 0))].sort((a, b) =>
    a.localeCompare(b),
  );

const parseAuthorIdent = (ident: string): string | null => {
  const match = ident.match(/^([^<]+)</);
  if (match === null) {
    return null;
  }
  const name = match[1]?.trim() ?? "";
  return name.length > 0 ? name : null;
};

const attributionForChangeset = async (
  cwd: string,
  relativePath: string,
  atCommit: string | null,
): Promise<{ authors: string[]; hash: string | null }> => {
  const names: string[] = [];
  let hash: string | null = null;
  const logArgs = ["log", "--reverse", "--use-mailmap", "--format=%H%x09%aN"];
  if (atCommit !== null) {
    logArgs.push(atCommit);
  }
  logArgs.push("--", relativePath);

  try {
    for (const line of splitLines(await git(logArgs, cwd))) {
      const tab = line.indexOf("\t");
      const lineHash = tab === -1 ? line : line.slice(0, tab);
      const name = tab === -1 ? "" : line.slice(tab + 1);
      if (hash === null && lineHash.length > 0) {
        hash = lineHash;
      }
      if (name.length > 0) {
        names.push(name);
      }
    }
  } catch {}

  if (atCommit === null) {
    let porcelain = "";
    try {
      porcelain = await git(["status", "--porcelain", "--", relativePath], cwd);
    } catch {
      porcelain = "";
    }
    if (porcelain.length > 0 || names.length === 0) {
      try {
        const ident = await git(["var", "GIT_AUTHOR_IDENT"], cwd);
        const current = parseAuthorIdent(ident);
        if (current !== null) {
          names.push(current);
        }
      } catch {}
    }
  }

  return { authors: uniqueSorted(names), hash };
};

const fileNameFromPath = (path: string): string =>
  path.replace(/\\/g, "/").split("/").pop() ?? path;

const buildEntry = async (input: {
  readonly cwd: string;
  readonly path: string;
  readonly changeset: ParsedChangeset;
  readonly attributionAt: string | null;
  readonly knownVersions: ReadonlyMap<string, string>;
  readonly mode: "pending" | "released";
}): Promise<ChangelogEntry> => {
  const { authors, hash } = await attributionForChangeset(
    input.cwd,
    input.path,
    input.attributionAt,
  );
  return {
    changeset: input.changeset,
    authors,
    hash,
    versions: versionsForChangeset(input.changeset.packages, input.knownVersions, input.mode),
  };
};

const entriesFromWorkingTree = async (
  cwd: string,
  changesetDir: string,
  fileNames: readonly string[],
  knownVersions: ReadonlyMap<string, string>,
): Promise<ChangelogEntry[]> => {
  const entries: ChangelogEntry[] = [];
  for (const fileName of fileNames) {
    const changeset = parseChangesetMarkdown(
      fileName,
      readFileSync(join(changesetDir, fileName), "utf8"),
    );
    if (changeset === null) {
      console.error(`Skipping unreadable changeset: ${fileName}`);
      continue;
    }
    entries.push(
      await buildEntry({
        cwd,
        path: `.changeset/${fileName}`,
        changeset,
        attributionAt: null,
        knownVersions,
        mode: "pending",
      }),
    );
  }
  return entries;
};

const entriesFromGitPaths = async (input: {
  readonly cwd: string;
  readonly paths: readonly string[];
  readonly contentSpec: (path: string) => string;
  readonly attributionAt: string | null;
  readonly knownVersions: ReadonlyMap<string, string>;
  readonly mode: "pending" | "released";
}): Promise<ChangelogEntry[]> => {
  const entries: ChangelogEntry[] = [];
  for (const path of input.paths) {
    if (!isChangesetMarkdownPath(path)) {
      continue;
    }
    const raw = await gitShow(input.cwd, input.contentSpec(path));
    if (raw === null) {
      continue;
    }
    const changeset = parseChangesetMarkdown(fileNameFromPath(path), raw);
    if (changeset === null) {
      continue;
    }
    entries.push(
      await buildEntry({
        cwd: input.cwd,
        path,
        changeset,
        attributionAt: input.attributionAt,
        knownVersions: input.knownVersions,
        mode: input.mode,
      }),
    );
  }
  return entries;
};

const uncommittedDeletedChangesetPaths = async (cwd: string): Promise<string[]> => {
  try {
    return splitLines(
      await git(["diff", "--name-only", "--diff-filter=D", "HEAD", "--", ".changeset"], cwd),
    );
  } catch {
    return [];
  }
};
