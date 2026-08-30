export type ReleaseVersionParts = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly sequence: number;
};

const RELEASE_VERSION_RE = /^(20\d{2})\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])\.([1-9]\d*)$/;

const EXAMPLE: ReleaseVersionParts = {
  year: 2026,
  month: 8,
  day: 26,
  sequence: 1,
};

const pad2 = (n: number): string => String(n).padStart(2, "0");

export const formatReleaseVersion = (parts: ReleaseVersionParts): string =>
  `${parts.year}.${pad2(parts.month)}.${pad2(parts.day)}.${parts.sequence}`;

export const formatReleaseBranch = (parts: ReleaseVersionParts): string =>
  `release/${formatReleaseVersion(parts)}`;

export const formatReleaseTag = (parts: ReleaseVersionParts): string =>
  `v${formatReleaseVersion(parts)}`;

export const formatReleaseBranchExample = (): string => formatReleaseBranch(EXAMPLE);

export const formatReleaseTagExample = (): string => formatReleaseTag(EXAMPLE);

export const parseReleaseVersionParts = (input: string): ReleaseVersionParts | null => {
  const match = RELEASE_VERSION_RE.exec(input.trim());
  if (match === null) {
    return null;
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    sequence: Number(match[4]),
  };
};

export const parseReleaseBranch = (input: string): string | null => {
  const trimmed = input.trim();
  const prefix = "release/";
  if (!trimmed.startsWith(prefix)) {
    return null;
  }
  const version = trimmed.slice(prefix.length);
  return parseReleaseVersionParts(version) === null ? null : version;
};

export const normalizeReleaseTag = (input: string): string | null => {
  const trimmed = input.trim();
  const version = trimmed.startsWith("v") ? trimmed.slice(1) : trimmed;
  return parseReleaseVersionParts(version) === null ? null : version;
};

export const calendarDateParts = (
  date: Date = new Date(),
): Pick<ReleaseVersionParts, "year" | "month" | "day"> => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

const RELEASE_DATE_ONLY_RE = /^(20\d{2})\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;

export const parseReleaseRef = (ref: string): ReleaseVersionParts | null => {
  const trimmed = ref.trim().replace(/^origin\//, "");
  const asBranch = parseReleaseBranch(trimmed);
  if (asBranch !== null) {
    return parseReleaseVersionParts(asBranch);
  }
  const asTag = normalizeReleaseTag(trimmed);
  if (asTag !== null) {
    return parseReleaseVersionParts(asTag);
  }
  return null;
};

export const parseReleaseCalendarDay = (
  input: string,
): Pick<ReleaseVersionParts, "year" | "month" | "day"> | null => {
  const normalized = input.trim().replace(/-/g, ".");
  const withSeq = RELEASE_DATE_ONLY_RE.test(normalized) ? `${normalized}.1` : normalized;
  const parts = parseReleaseVersionParts(withSeq);
  if (parts === null) {
    return null;
  }
  return { year: parts.year, month: parts.month, day: parts.day };
};

export const nextReleaseVersion = (
  knownRefs: readonly string[],
  day: Pick<ReleaseVersionParts, "year" | "month" | "day">,
): ReleaseVersionParts => {
  let maxSequence = 0;
  for (const ref of knownRefs) {
    const parts = parseReleaseRef(ref);
    if (parts === null) {
      continue;
    }
    if (parts.year !== day.year || parts.month !== day.month || parts.day !== day.day) {
      continue;
    }
    if (parts.sequence > maxSequence) {
      maxSequence = parts.sequence;
    }
  }
  return {
    year: day.year,
    month: day.month,
    day: day.day,
    sequence: maxSequence + 1,
  };
};
