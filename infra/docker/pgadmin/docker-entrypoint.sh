#!/bin/sh
set -e

# Writable locations inside the container (do not mount over /pgadmin4;
# that path owns the pgAdmin application in dpage/pgadmin4).
CONFIG_DIR="${PGADMIN_CONFIG_DIR:-/var/lib/pgadmin}"
PGPASS_FILE="${PGPASS_FILE:-${CONFIG_DIR}/pgpass}"
SERVERS_JSON="${PGADMIN_SERVER_JSON_FILE:-${CONFIG_DIR}/servers.json}"

mkdir -p "$CONFIG_DIR"

# Generate pgpass for pre-configured servers.
# Ory: one host (ory-postgres), admin can open both kratos and hydra DBs.
cat > "$PGPASS_FILE" <<EOF
identity-postgres:5432:*:identity:${POSTGRES_IDENTITY_PASSWORD}
issues-postgres:5432:*:issues:${POSTGRES_ISSUES_PASSWORD}
inventory-postgres:5432:*:inventory:${POSTGRES_INVENTORY_PASSWORD}
product-postgres:5432:*:product:${POSTGRES_PRODUCT_PASSWORD}
attachment-postgres:5432:*:attachment:${POSTGRES_ATTACHMENT_PASSWORD}
notification-postgres:5432:*:notification:${POSTGRES_NOTIFICATION_PASSWORD}
ory-postgres:5432:*:postgres:${POSTGRES_ADMIN_PASSWORD}
postgres:5432:*:postgres:${POSTGRES_ADMIN_PASSWORD}
EOF

chmod 600 "$PGPASS_FILE"

# Shared Ory server fragment: one Postgres instance, databases kratos + hydra.
# Used identically in multi-db and single-db modes.
ory_server_json() {
  id="$1"
  cat <<EOF
    "$id": {
      "Name": "Ory Postgres",
      "Group": "Ory",
      "Host": "ory-postgres",
      "Port": 5432,
      "MaintenanceDB": "postgres",
      "Username": "postgres",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE",
      "Comment": "Shared instance for Kratos (db: kratos) and Hydra (db: hydra)",
      "DBRestriction": "kratos,hydra"
    }
EOF
}

# Generate servers.json
if [ "$PGADMIN_CONFIG_TYPE" = "multi-db" ]; then
  cat > "$SERVERS_JSON" <<EOF
{
  "Servers": {
    "1": {
      "Name": "Identity Service DB",
      "Group": "Issue Tracker",
      "Host": "identity-postgres",
      "Port": 5432,
      "MaintenanceDB": "identity",
      "Username": "identity",
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
      "Name": "Inventory Service DB",
      "Group": "Issue Tracker",
      "Host": "inventory-postgres",
      "Port": 5432,
      "MaintenanceDB": "inventory",
      "Username": "inventory",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "4": {
      "Name": "Product Service DB",
      "Group": "Issue Tracker",
      "Host": "product-postgres",
      "Port": 5432,
      "MaintenanceDB": "product",
      "Username": "product",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "5": {
      "Name": "Attachment Service DB",
      "Group": "Issue Tracker",
      "Host": "attachment-postgres",
      "Port": 5432,
      "MaintenanceDB": "attachment",
      "Username": "attachment",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
    "6": {
      "Name": "Notification Service DB",
      "Group": "Issue Tracker",
      "Host": "notification-postgres",
      "Port": 5432,
      "MaintenanceDB": "notification",
      "Username": "notification",
      "SSLMode": "prefer",
      "PassFile": "$PGPASS_FILE"
    },
$(ory_server_json 7)
  }
}
EOF
else
  # Default / single-db: app DBs on service "postgres"; Ory on shared ory-postgres
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
    },
$(ory_server_json 2)
  }
}
EOF
fi

export PGADMIN_SERVER_JSON_FILE="$SERVERS_JSON"
export PGPASS_FILE="$PGPASS_FILE"

# Hand off to the image's original entrypoint
exec /entrypoint.sh
