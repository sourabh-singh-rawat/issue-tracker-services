# Pine agent rules

Canonical project instructions for coding agents (Grok, Claude Code, Cursor, Copilot, etc.).
Skills with deeper recipes live under `tools/ai/*/SKILL.md` (loaded via `.grok/config.toml`).

## Database migrations — do not generate

**Never generate, create, rewrite, or apply database migrations on your own.**

That includes, without an **explicit** user request in the current turn:

- Running `db:generate`, `dev:db:generate`, `drizzle-kit generate`, or any turbo/`pnpm` script that generates SQL migrations
- Running `db:migrate`, `db:push`, or equivalent apply/push commands
- Hand-writing or editing files under any service’s `drizzle/` folder (`.sql`, `meta/*_snapshot.json`, `_journal.json`, etc.)
- Inventing migration filenames, snapshots, or journal entries to “finish” a schema change

When schema/table code changes require a migration:

1. Update Drizzle table/schema TypeScript only (e.g. `src/db/tables/**`).
2. Stop and tell the user that a migration must be generated.
3. Give the exact command for the service (from that package’s `package.json`), for example:
   - `pnpm exec turbo run db:generate --filter=@pine/<service>`
   - or `pnpm --filter @pine/<service> db:generate`
4. Wait for the **user** to run generation (or to explicitly ask you to run it). Do not run it yourself unless they clearly request that in the same conversation.

Schema/type changes without touching `drizzle/` artifacts are fine. Shipping incomplete schema work and leaving migration generation to the human is the intended workflow.

## Other guardrails

- Prefer filtered turbo builds/tests; full monorepo only when needed.
- Never hand-edit `**/__generated__/**` or `api-gateway/dist/*`.
- Do not search or edit `infra/data/` or `node_modules/` for product work.
- Use current packages only: `@pine/http-core`, `@pine/events` — not `server-core` / `event-bus`.
- Load the matching skill under `tools/ai/` for orientation, features, events, GraphQL, web, release, docker, k8s, or observability.

## Generated React Query hooks (web apps)

**Always use the generated hooks.** Never compose `useQuery` / `useMutation` with `*Options` helpers from codegen.

| Do | Don't |
| --- | --- |
| `useVerifyEmailQuery({ query: { … } })` | `useQuery({ ...verifyEmailOptions({ … }) })` |
| `useGetConsentChallengeQuery({ query: { … } })` | `useQuery({ ...getConsentChallengeOptions({ … }) })` |
| `useAcceptConsentChallengeMutation()` | `useMutation(acceptConsentChallengeMutation())` |
| GraphQL: `useFindProjectQuery(vars, { enabled })` | Hand-rolled `useQuery` against the GQL client |

- REST/OpenAPI: import `useXQuery` / `useXMutation` from `@generated/api/@tanstack/react-query.gen`.
- GraphQL: import `useXQuery` / `useXMutation` from `@generated/gql`.
- `*Options` / `*Mutation` factories are for non-hook use only (prefetch, queryClient, tests) — not for components.
- Do not re-wrap generated options with TanStack's `useQuery` just to pass `enabled` or similar; use the generated hook API (and GraphQL's second-arg options object when available).
- **Never destructure** query/mutation hook results. Assign the return value and read properties (`const userQuery = useGetCurrentUserQuery(); userQuery.data`). Enforced by oxlint `pine/no-destructure-query-mutation`.
