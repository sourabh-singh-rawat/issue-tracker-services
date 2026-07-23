#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<EOF
-- Kratos and Hydra share one Postgres instance with separate roles/DBs
CREATE ROLE kratos WITH LOGIN PASSWORD '${POSTGRES_KRATOS_PASSWORD}';
CREATE DATABASE kratos OWNER kratos;

CREATE ROLE hydra WITH LOGIN PASSWORD '${POSTGRES_HYDRA_PASSWORD}';
CREATE DATABASE hydra OWNER hydra;
EOF
