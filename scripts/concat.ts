import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { encodingForModel } from "js-tiktoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to get all files recursively
function getFilesRecursively(dir: string, excludeDirs = ["node_modules", ".git", "dist", "build", ".next", ".nx"]): string[] {
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
    console.log("Usage: npx tsx scripts/concat.ts <target_directory_path> [output_file_path] [-e extension1,extension2,...]");
    process.exit(1);
  }

  const targetDir = path.resolve(positional[0]);
  if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
    console.error(`Error: Target directory "${targetDir}" does not exist or is not a directory.`);
    process.exit(1);
  }

  // Default output is "combined_output.txt" in the root directory (parent of "scripts")
  const defaultOutputDir = path.resolve(__dirname, "..");
  const defaultOutputFile = path.join(defaultOutputDir, "combined_output.txt");
  const outputFile = positional[1] ? path.resolve(positional[1]) : defaultOutputFile;

  console.log(`Scanning target directory: ${targetDir}`);
  if (extensions) {
    console.log(`Filtering files by extensions: ${extensions.join(", ")}`);
  }
  
  // Exclude output file itself from compilation
  let files: string[];
  try {
    files = getFilesRecursively(targetDir);
  } catch (err: any) {
    console.error("Error scanning directory:", err.message);
    process.exit(1);
  }

  // Filter out the output file, typescript/javascript script itself, and any previous script variants
  files = files.filter((f) => f !== outputFile && f !== __filename && !f.endsWith("combine.ts") && !f.endsWith("combine.js"));

  // Filter by extensions if specified
  if (extensions) {
    files = files.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return extensions.includes(ext);
    });
  }

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
    const gitignorePath = path.resolve(__dirname, "../.gitignore");
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
      const relOutputFile = path.relative(path.dirname(gitignorePath), outputFile).replace(/\\/g, "/");
      
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
