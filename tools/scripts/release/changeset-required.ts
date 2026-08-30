import { execFile } from "node:child_process";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const IGNORED = new Set([".changeset/README.md", ".changeset/config.json"]);

export const MAX_CHANGESET_COUNT = 1;

export type ChangesetCountVerdict =
  | { readonly ok: true; readonly files: readonly string[] }
  | {
      readonly ok: false;
      readonly reason: "multiple" | "release-nonempty";
      readonly files: readonly string[];
    };

export const isReleaseBranch = (ref: string): boolean => {
  const normalized = ref.trim().replace(/^refs\/heads\//, "");
  return normalized.startsWith("release/");
};

export const evaluateChangesetCount = (
  files: readonly string[],
  options: { readonly releaseBranch: boolean } = { releaseBranch: false },
): ChangesetCountVerdict => {
  if (options.releaseBranch) {
    if (files.length === 0) {
      return { ok: true, files };
    }
    return { ok: false, reason: "release-nonempty", files };
  }

  if (files.length <= MAX_CHANGESET_COUNT) {
    return { ok: true, files };
  }
  return { ok: false, reason: "multiple", files };
};

export const listNewChangesets = async (cwd: string, baseRef: string): Promise<string[]> => {
  const raw = await runGit(
    ["diff", "--name-only", "--diff-filter=A", `${baseRef}...HEAD`, "--", ".changeset"],
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
};

export const main = async (argv: readonly string[] = process.argv.slice(2)): Promise<number> => {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`
      Usage: changeset-required [base-ref]
      Default base-ref: origin/dev

      Exits 0 when HEAD adds at most one new .changeset/*.md file since the base (zero is allowed).
      Exits 1 when there is more than one.

      On release/* branches: exits 0 only when there are zero new changesets.
      Skip in CI: add the PR label "skip-changeset".
`);
    return 0;
  }

  const baseRef = argv[0] ?? "origin/dev";
  const cwd = process.cwd();

  let releaseBranch = false;
  try {
    const headRef = await resolveHeadRef(cwd);
    releaseBranch = isReleaseBranch(headRef);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to resolve HEAD ref: ${message}`);
    return 1;
  }

  try {
    await runGit(["rev-parse", "--verify", baseRef], cwd);
  } catch {
    console.error(`Base ref not found: ${baseRef}\n` + `Fetch it first, e.g. git fetch origin dev`);
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
    const verdict = evaluateChangesetCount(files, { releaseBranch });

    if (!verdict.ok) {
      console.error(formatFailure(baseRef, verdict));
      return 1;
    }

    if (releaseBranch) {
      console.log(`OK: release branch has no new changesets since ${baseRef}`);
      return 0;
    }

    if (verdict.files.length === 0) {
      console.log(`OK: no new changesets since ${baseRef} (0–${MAX_CHANGESET_COUNT} allowed)`);
      return 0;
    }

    console.log(`OK: ${verdict.files.length} new changeset since ${baseRef}:`);
    for (const file of verdict.files) {
      console.log(`  - ${file}`);
    }
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to check changesets: ${message}`);
    return 1;
  }
};

const runGit = async (args: readonly string[], cwd: string): Promise<string> => {
  const { stdout } = await execFileAsync("git", [...args], {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  return stdout.trim();
};

const formatFailure = (
  baseRef: string,
  verdict: Extract<ChangesetCountVerdict, { ok: false }>,
): string => {
  const listed = verdict.files.map((f) => `  - ${f}`).join("\n");

  if (verdict.reason === "release-nonempty") {
    return (
      `Release branches must not add Changeset files (found ${verdict.files.length} since ${baseRef}).\n\n` +
      `New changeset files:\n${listed}\n\n` +
      `Remove them:\n` +
      `  git rm .changeset/<name>.md\n`
    );
  }

  return (
    `Expected at most ${MAX_CHANGESET_COUNT} new Changeset file since ${baseRef}, ` +
    `found ${verdict.files.length}.\n\n` +
    `New changeset files:\n${listed}\n\n` +
    `One PR / feature should have at most one changeset.\n` +
    `Keep one file and remove extras:\n` +
    `  git rm .changeset/<extra-name>.md\n`
  );
};

const resolveHeadRef = async (cwd: string): Promise<string> => {
  const fromEnv = process.env.GITHUB_HEAD_REF?.trim();
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return runGit(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
};

const isMainModule = (): boolean => {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  try {
    return import.meta.url === pathToFileURL(entry).href;
  } catch {
    return entry.replace(/\\/g, "/").endsWith("/tools/scripts/release/changeset-required.ts");
  }
};

if (isMainModule()) {
  void main().then((code) => {
    process.exitCode = code;
  });
}
