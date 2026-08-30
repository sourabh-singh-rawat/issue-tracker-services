---
name: pine-changeset-release
description: >
  Changesets for development PRs; calver release/* branches and GitHub Release on
  main. Triggers: changeset, skip-changeset, release/YYYY, calver, version.
---

# Changesets & release

| Concept        | Value                                         |
| -------------- | --------------------------------------------- |
| PR notes       | `.changeset/*.md` via `pnpm changeset`        |
| Product tag    | `vYYYY.MM.DD.N`                               |
| Release branch | `release/YYYY.MM.DD.N`                        |
| Config         | `.changeset/config.json` (`baseBranch: main`) |

Scripts: `tools/scripts/changeset-required.ts`, `create-release-branch.ts`, `release-branch-check.ts`, `release.ts`.

## PR → `dev`

Non-draft PRs may include **at most one** new changeset file (CI: `changeset-required.yml`). Zero is allowed.

```bash
pnpm changeset
pnpm changeset-required   # base: origin/dev
```

```md
---
"@pine/erp-web": minor
---

feat(erp-web): one-line summary
```

- More than one new `.changeset/*.md` → fail
- `release/*` PRs must have **zero** new changesets
- Optional escape hatch: label **`skip-changeset`**
- Draft PRs skip check until ready

## Product release

```bash
pnpm branch:release                  # switches to dev, then next N for today
pnpm branch:release --push
pnpm release-branch-check            # name shape + no leftover changesets
# merge release/* → main → release.yml tags vYYYY.MM.DD.N + GitHub Release
```

Do not hand-tag with non-calver semver. Do not invent `release-2026...` branch names.

## Package publish helpers

`pnpm changeset` · `changeset:version` · `changeset:release` — package semver; product ship is calver via release branch merge.
