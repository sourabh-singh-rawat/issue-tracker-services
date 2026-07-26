// Required by EnvSchema before any module under test imports `@/bootstrap/env`.
process.env.JWT_SECRET ??= "test-secret";
process.env.IDENTITY_POSTGRES_CLUSTER_URL ??= "postgres://localhost:5432/identity_test";
