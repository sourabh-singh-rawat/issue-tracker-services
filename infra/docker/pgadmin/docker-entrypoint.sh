#!/bin/sh
set -e

# Writable locations inside the container (do not mount over /pgadmin4;
# that path owns the pgAdmin application in dpage/pgadmin4).
CONFIG_DIR="${PGADMIN_CONFIG_DIR:-/var/lib/pgadmin}"
PGPASS_FILE="${PGPASS_FILE:-${CONFIG_DIR}/pgpass}"
SERVERS_JSON="${PGADMIN_SERVER_JSON_FILE:-${CONFIG_DIR}/servers.json}"

mkdir -p "$CONFIG_DIR"

# Generate pgpass for pre-configured servers
cat > "$PGPASS_FILE" <<EOF
auth-postgres:5432:*:auth:${POSTGRES_AUTH_PASSWORD}
issues-postgres:5432:*:issues:${POSTGRES_ISSUES_PASSWORD}
mail-postgres:5432:*:mail:${POSTGRES_MAIL_PASSWORD}
attachment-postgres:5432:*:attachment:${POSTGRES_ATTACHMENT_PASSWORD}
postgres:5432:*:postgres:${POSTGRES_ADMIN_PASSWORD}
EOF

chmod 600 "$PGPASS_FILE"

# Generate servers.json
if [ "$PGADMIN_CONFIG_TYPE" = "multi-db" ]; then
  cat > "$SERVERS_JSON" <<EOF
{
  "Servers": {
    "1": {
      "Name": "Auth Service DB",
      "Group": "Issue Tracker",
      "Host": "auth-postgres",
      "Port": 5432,
      "MaintenanceDB": "auth",
      "Username": "auth",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "2": {
      "Name": "Issues Service DB",
      "Group": "Issue Tracker",
      "Host": "issues-postgres",
      "Port": 5432,
      "MaintenanceDB": "issues",
      "Username": "issues",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "3": {
      "Name": "Mail Service DB",
      "Group": "Issue Tracker",
      "Host": "mail-postgres",
      "Port": 5432,
      "MaintenanceDB": "mail",
      "Username": "mail",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "4": {
      "Name": "Attachment Service DB",
      "Group": "Issue Tracker",
      "Host": "attachment-postgres",
      "Port": 5432,
      "MaintenanceDB": "attachment",
      "Username": "attachment",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    }
  }
}
EOF
else
  cat > "$SERVERS_JSON" <<EOF
{
  "Servers": {
    "1": {
      "Name": "Single DB (Minimal)",
      "Group": "Issue Tracker",
      "Host": "postgres",
      "Port": 5432,
      "MaintenanceDB": "postgres",
      "Username": "postgres",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    }
  }
}
EOF
fi

export PGADMIN_SERVER_JSON_FILE="$SERVERS_JSON"
export PGPASS_FILE="$PGPASS_FILE"

# Hand off to the image's original entrypoint
exec /entrypoint.sh
