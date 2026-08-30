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

Scripts: `tools/scripts/branches/create-release-branch.ts`, `clean-local-branches.ts`; `tools/scripts/release/changeset-required.ts`, `release-branch-check.ts`, `release.ts`; `tools/scripts/changelog/main.ts`.

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

## Product release flow

1. **Create the release branch** from current `dev`:

```bash
pnpm branch:release --push
# → release/YYYY.MM.DD.N (pushed)
```

2. **CI versions + root changelog** on that branch (`release-version.yml`):
   - If `.changeset/*.md` pending → `pnpm changeset:version` (`changeset version` + `pnpm changelog:root`)
   - Else if `CHANGELOG.md` lacks `## vYYYY.MM.DD.N` → `pnpm changelog:root` only
   - Commits `chore(release): vYYYY.MM.DD.N` and pushes back to `release/*`

   You can still run the same locally before push if you prefer:

```bash
pnpm changeset:version
git add -A
git commit -m "chore(release): vYYYY.MM.DD.N"
git push
```

3. **Open PR** `release/YYYY.MM.DD.N` → `main`. `release-branch-check.yml` requires a calver branch name and **zero** leftover changesets.

4. **Merge to `main`**. `release.yml` creates annotated tag `vYYYY.MM.DD.N` and a GitHub Release whose notes come from the matching `CHANGELOG.md` section (`### Minor` / `### Patch` + `### Packages`).

5. Sync `main` back to `dev` as usual. Optional local cleanup: `pnpm branch:clean`.

```bash
# rewrite existing GitHub Release bodies from CHANGELOG.md (ops / backfill)
pnpm release --sync-notes
```

Do not hand-tag with non-calver semver. Do not invent `release-2026...` branch names.

## Package publish helpers

`pnpm changeset` · `changeset:version` · `changeset:release` — package semver; product ship is calver via release branch merge.
