# Pine AI skills

Loaded via `.grok/config.toml` → `skills.paths = ["tools/ai"]`.

Repo-wide agent rules (including **never auto-generate DB migrations**): root [`AGENTS.md`](../../AGENTS.md).

| Skill                                                       | Load when                       |
| ----------------------------------------------------------- | ------------------------------- |
| [pine-orientation](./pine-orientation/SKILL.md)             | Where does X live / ownership   |
| [pine-dev-loop](./pine-dev-loop/SKILL.md)                   | Run, build, test, compose       |
| [pine-service-feature](./pine-service-feature/SKILL.md)     | Backend feature / DI            |
| [pine-events](./pine-events/SKILL.md)                       | NATS publish/subscribe          |
| [pine-graphql](./pine-graphql/SKILL.md)                     | Pothos schema / compose         |
| [pine-web-feature](./pine-web-feature/SKILL.md)             | React routes / `.gql` / codegen |
| [pine-changeset-release](./pine-changeset-release/SKILL.md) | Changeset / calver release      |
| [pine-docker-infra](./pine-docker-infra/SKILL.md)           | Local compose / Ory             |
| [pine-k8s](./pine-k8s/SKILL.md)                             | Helm / cluster                  |
| [pine-observability](./pine-observability/SKILL.md)         | OTEL / Alloy                    |

## Dead → live packages

`server-core`→`http` · `event-bus`→`events` · `comm`→notification-service `integrations/email` · `forms`→app UI

## Missing skills (backlog)

identity-auth (Kratos/Hydra deep dive) · shared-packages · testing · schema-codegen
