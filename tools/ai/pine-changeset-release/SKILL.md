---
name: pine-changeset-release
description: >
  Changesets for development PRs; calver release/* branches and GitHub Release on
  main. Triggers: changeset, skip-changeset, release/YYYY, calver, version.
---

# Changesets & release

| Concept | Value |
|---------|--------|
| PR notes | `.changeset/*.md` via `pnpm changeset` |
| Product tag | `vYYYY.MM.DD.N` |
| Release branch | `release/YYYY.MM.DD.N` |
| Config | `.changeset/config.json` (`baseBranch: main`) |

Scripts: `scripts/changeset-required.ts`, `create-release-branch.ts`, `release-branch-check.ts`, `release.ts`.

## PR → `development`

Non-draft PRs need **exactly one** new changeset file (CI: `changeset-required.yml`).

```bash
pnpm changeset
pnpm changeset-required   # base: origin/development
```

```md
---
"@pine/issues-web": minor
---

feat(issues-web): one-line summary
```

- Zero or multiple new `.changeset/*.md` → fail
- Docs/CI-only: label **`skip-changeset`**
- Draft PRs skip check until ready

## Product release

```bash
pnpm create-release-branch           # next N for today from development
pnpm create-release-branch --push
pnpm release-branch-check            # name shape + no leftover changesets
# merge release/* → main → release.yml tags vYYYY.MM.DD.N + GitHub Release
```

Do not hand-tag with non-calver semver. Do not invent `release-2026...` branch names.

## Package publish helpers

`pnpm changeset` · `changeset:version` · `changeset:release` — package semver; product ship is calver via release branch merge.
