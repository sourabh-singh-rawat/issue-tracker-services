/**
 * Product release identifiers for pine.
 *
 * Format: vYYYY.MM.DD.N  (example: v2026.08.01.1)
 * - YYYY: year
 * - MM: month 01-12
 * - DD: day 01-31
 * - N: sequence for that calendar day (1, 2, …)
 *
 * Branch names: release/2026.08.01.1 or release/v2026.08.01.1
 * Git tags / GitHub Releases: always normalized with the leading "v".
 */

/** Matches optional leading v, then YYYY.MM.DD.N */
export const RELEASE_VERSION_RE =
  /^v?(20\d{2})\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])\.([1-9]\d*)$/;

/**
 * Normalize a raw version or tag string to `vYYYY.MM.DD.N`.
 * Returns null when the input is not a valid product release id.
 */
export function normalizeReleaseTag(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(RELEASE_VERSION_RE);
  if (match === null) {
    return null;
  }
  return `v${match[1]}.${match[2]}.${match[3]}.${match[4]}`;
}

/**
 * Parse a git branch ref like `release/2026.08.01.1` into tag `v2026.08.01.1`.
 */
export function parseReleaseBranch(ref: string): string | null {
  const normalized = ref.trim().replace(/^refs\/heads\//, "");
  const prefix = "release/";
  if (!normalized.startsWith(prefix)) {
    return null;
  }
  const remainder = normalized.slice(prefix.length);
  return normalizeReleaseTag(remainder);
}

export function formatReleaseBranchExample(): string {
  return "release/2026.08.01.1";
}

export function formatReleaseTagExample(): string {
  return "v2026.08.01.1";
}
