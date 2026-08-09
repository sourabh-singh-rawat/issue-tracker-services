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

export type ReleaseVersionParts = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly sequence: number;
};

/**
 * Normalize a raw version or tag string to `vYYYY.MM.DD.N`.
 * Returns null when the input is not a valid product release id.
 */
export function normalizeReleaseTag(input: string): string | null {
  const parts = parseReleaseVersionParts(input);
  if (parts === null) {
    return null;
  }
  return formatReleaseTag(parts);
}

/**
 * Parse a product release id into numeric parts.
 * Accepts tags (`v2026.08.01.1`), bare versions, or branch remainders.
 */
export function parseReleaseVersionParts(input: string): ReleaseVersionParts | null {
  const trimmed = input.trim();
  const match = trimmed.match(RELEASE_VERSION_RE);
  if (match === null) {
    return null;
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    sequence: Number(match[4]),
  };
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

export function formatReleaseTag(parts: ReleaseVersionParts): string {
  const mm = String(parts.month).padStart(2, "0");
  const dd = String(parts.day).padStart(2, "0");
  return `v${parts.year}.${mm}.${dd}.${parts.sequence}`;
}

/** Branch name without leading v: release/YYYY.MM.DD.N */
export function formatReleaseBranch(parts: ReleaseVersionParts): string {
  const mm = String(parts.month).padStart(2, "0");
  const dd = String(parts.day).padStart(2, "0");
  return `release/${parts.year}.${mm}.${dd}.${parts.sequence}`;
}

/**
 * Local calendar date parts (YYYY-MM-DD components) for calver.
 * Pass an explicit Date for tests; defaults to now.
 */
export function calendarDateParts(
  date: Date = new Date(),
): Pick<ReleaseVersionParts, "year" | "month" | "day"> {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

/**
 * Highest sequence already used for the given calendar day among known tags/branches.
 * Known refs may be tags (`v…`), branches (`release/…`), or bare versions.
 */
export function maxSequenceForDay(
  knownRefs: readonly string[],
  day: Pick<ReleaseVersionParts, "year" | "month" | "day">,
): number {
  let max = 0;
  for (const ref of knownRefs) {
    const tag = parseReleaseBranch(ref) ?? normalizeReleaseTag(ref);
    if (tag === null) {
      continue;
    }
    const parts = parseReleaseVersionParts(tag);
    if (parts === null) {
      continue;
    }
    if (parts.year === day.year && parts.month === day.month && parts.day === day.day) {
      max = Math.max(max, parts.sequence);
    }
  }
  return max;
}

/**
 * Next product release for a calendar day given existing tags/branches.
 */
export function nextReleaseVersion(
  knownRefs: readonly string[],
  day: Pick<ReleaseVersionParts, "year" | "month" | "day"> = calendarDateParts(),
): ReleaseVersionParts {
  return {
    year: day.year,
    month: day.month,
    day: day.day,
    sequence: maxSequenceForDay(knownRefs, day) + 1,
  };
}

export function formatReleaseBranchExample(): string {
  return "release/2026.08.01.1";
}

export function formatReleaseTagExample(): string {
  return "v2026.08.01.1";
}
