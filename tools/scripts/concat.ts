import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { encodingForModel } from "js-tiktoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_EXCLUDE_DIRS = ["node_modules", ".git", "dist", "build", ".next", ".nx"];
const IS_WINDOWS = process.platform === "win32";

/** Normalize for comparison (slashes + case on Windows). */
function normalizeForCompare(p: string): string {
  const resolved = path.resolve(p).replace(/\\/g, "/");
  return IS_WINDOWS ? resolved.toLowerCase() : resolved;
}

/** True if `file` is the same as `dir` or a descendant of it. */
function isPathInside(file: string, dir: string): boolean {
  const f = normalizeForCompare(file);
  const d = normalizeForCompare(dir);
  return f === d || f.startsWith(d.endsWith("/") ? d : d + "/");
}

/** Walk the tree with a fixed exclude-dir list (used when not inside a git repo). */
function getFilesRecursively(dir: string, excludeDirs = DEFAULT_EXCLUDE_DIRS): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        results = results.concat(getFilesRecursively(filePath, excludeDirs));
      }
    } else {
      results.push(filePath);
    }
  }
  return results;
}

/**
 * List files under targetDir that are not ignored by git (.gitignore, nested
 * gitignores, .git/info/exclude, and global excludes). Includes tracked files
 * and untracked non-ignored files. Returns null if targetDir is not in a git repo.
 */
function getFilesRespectingGitignore(targetDir: string): string[] | null {
  try {
    // Resolve so drive-letter / slash style matches path.resolve(gitRoot, rel) below.
    // On Windows, git often reports "D:/..." while the user may pass "d:\...".
    const gitRoot = path.resolve(
      execFileSync("git", ["rev-parse", "--show-toplevel"], {
        cwd: targetDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim(),
    );

    const relativeTarget = path.relative(gitRoot, targetDir).replace(/\\/g, "/") || ".";

    // --cached: tracked files
    // --others: untracked files
    // --exclude-standard: apply .gitignore, info/exclude, and global excludes
    // Prefer a pathspec under the repo; if roots disagree (e.g. odd casing), list all and filter.
    const pathspec =
      relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget) ? ["."] : [relativeTarget];

    const output = execFileSync(
      "git",
      ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...pathspec],
      {
        cwd: gitRoot,
        encoding: "utf8",
        maxBuffer: 50 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      },
    );

    if (!output) {
      return [];
    }

    return output
      .split("\0")
      .filter(Boolean)
      .map((rel) => path.resolve(gitRoot, rel))
      .filter((abs) => {
        if (!isPathInside(abs, targetDir)) {
          return false;
        }
        try {
          return fs.statSync(abs).isFile();
        } catch {
          return false;
        }
      });
  } catch {
    return null;
  }
}

function collectFiles(targetDir: string): { files: string[]; usedGitignore: boolean } {
  const gitFiles = getFilesRespectingGitignore(targetDir);
  if (gitFiles !== null) {
    return { files: gitFiles, usedGitignore: true };
  }

  console.warn(
    "Warning: Not inside a git repository; falling back to default directory excludes (node_modules, dist, …).",
  );
  return { files: getFilesRecursively(targetDir), usedGitignore: false };
}

function parseArgs(args: string[]) {
  let extensions: string[] | null = null;
  const filteredArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-e") {
      if (i + 1 < args.length) {
        const extStr = args[i + 1];
        extensions = extStr.split(",").map((ext) => {
          const trimmed = ext.trim().toLowerCase();
          return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
        });
        i++; // skip the next item
      } else {
        console.error("Error: -e flag requires a value (comma-separated list of extensions).");
        process.exit(1);
      }
    } else {
      filteredArgs.push(args[i]);
    }
  }

  return { extensions, positional: filteredArgs };
}

function main(): void {
  const parsed = parseArgs(process.argv.slice(2));
  const positional = parsed.positional;
  const extensions = parsed.extensions;

  if (positional.length === 0) {
    console.log(
      "Usage: npx tsx tools/scripts/concat.ts <target_directory_path> [output_file_path] [-e extension1,extension2,...]",
    );
    process.exit(1);
  }

  const targetDir = path.resolve(positional[0]);
  if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
    console.error(`Error: Target directory "${targetDir}" does not exist or is not a directory.`);
    process.exit(1);
  }

  // Default output is "combined_output.txt" in the monorepo root
  const defaultOutputDir = path.resolve(__dirname, "../..");
  const defaultOutputFile = path.join(defaultOutputDir, "combined_output.txt");
  const outputFile = positional[1] ? path.resolve(positional[1]) : defaultOutputFile;

  console.log(`Scanning target directory: ${targetDir}`);
  if (extensions) {
    console.log(`Filtering files by extensions: ${extensions.join(", ")}`);
  }

  let files: string[];
  let usedGitignore: boolean;
  try {
    ({ files, usedGitignore } = collectFiles(targetDir));
  } catch (err: any) {
    console.error("Error scanning directory:", err.message);
    process.exit(1);
  }

  if (usedGitignore) {
    console.log("Respecting .gitignore (and related git exclude rules).");
  }

  // Filter out the output file, this script, and any previous script variants
  files = files.filter((f) => {
    if (normalizeForCompare(f) === normalizeForCompare(outputFile)) return false;
    if (normalizeForCompare(f) === normalizeForCompare(__filename)) return false;
    if (f.endsWith("combine.ts") || f.endsWith("combine.js")) return false;
    return true;
  });

  // Filter by extensions if specified
  if (extensions) {
    files = files.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return extensions.includes(ext);
    });
  }

  // Stable order for reproducible output
  files.sort((a, b) => a.localeCompare(b));

  console.log(`Found ${files.length} files to combine.`);

  let combinedContent = "";

  for (const file of files) {
    const relativePath = path.relative(targetDir, file);
    try {
      const content = fs.readFileSync(file, "utf8");
      combinedContent += `\n========================================================================\n`;
      combinedContent += `FILE: ${relativePath}\n`;
      combinedContent += `========================================================================\n\n`;
      combinedContent += content;
      combinedContent += `\n`;
    } catch (err: any) {
      console.warn(`Warning: Could not read file ${relativePath}: ${err.message}`);
    }
  }

  // Write the combined file
  try {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, combinedContent, "utf8");
    console.log(`Successfully combined files into: ${outputFile}`);
  } catch (err: any) {
    console.error("Error writing combined file:", err.message);
    process.exit(1);
  }

  // Calculate tokens
  console.log("Calculating token counts...");
  try {
    // GPT-5.5 (o200k_base tokenizer)
    const enc = encodingForModel("gpt-4o");
    const tokens = enc.encode(combinedContent).length;
    console.log(`Tokens (GPT-5.5): ${tokens}`);
  } catch (err: any) {
    console.error("Error calculating tokens:", err.message);
  }

  // Auto-add to .gitignore if not present
  try {
    const gitignorePath = path.resolve(__dirname, "../../.gitignore");
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
      const relOutputFile = path
        .relative(path.dirname(gitignorePath), outputFile)
        .replace(/\\/g, "/");

      if (!gitignoreContent.includes(relOutputFile)) {
        fs.appendFileSync(gitignorePath, `\n# Combined scripts output\n${relOutputFile}\n`);
        console.log(`Added ${relOutputFile} to .gitignore`);
      }
    }
  } catch (err: any) {
    console.warn("Warning: Could not update .gitignore:", err.message);
  }
}

main();
