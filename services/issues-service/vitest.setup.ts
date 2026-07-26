// Required by EnvSchema before any module under test imports `@/env`.
process.env.JWT_SECRET ??= "test-secret";
process.env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL ??= "postgres://localhost:5432/issues_test";
