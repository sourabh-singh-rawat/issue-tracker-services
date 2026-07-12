#!/bin/sh
set -e

# Generate pgpass
cat > /config/pgpass <<EOF
auth-postgres:5432:*:auth:${POSTGRES_AUTH_PASSWORD}
issues-postgres:5432:*:issues:${POSTGRES_ISSUES_PASSWORD}
mail-postgres:5432:*:mail:${POSTGRES_MAIL_PASSWORD}
attachment-postgres:5432:*:attachment:${POSTGRES_ATTACHMENT_PASSWORD}
postgres:5432:*:postgres:${POSTGRES_ADMIN_PASSWORD}
EOF

chmod 600 /config/pgpass

# Generate servers.json
if [ "$PGADMIN_CONFIG_TYPE" = "multi-db" ]; then
  cat > /pgadmin4/servers.json <<EOF
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
      "PassFile": "/config/pgpass"
    },
    "2": {
      "Name": "Issues Service DB",
      "Group": "Issue Tracker",
      "Host": "issues-postgres",
      "Port": 5432,
      "MaintenanceDB": "issues",
      "Username": "issues",
      "SSLMode": "prefer",
      "PassFile": "/config/pgpass"
    },
    "3": {
      "Name": "Mail Service DB",
      "Group": "Issue Tracker",
      "Host": "mail-postgres",
      "Port": 5432,
      "MaintenanceDB": "mail",
      "Username": "mail",
      "SSLMode": "prefer",
      "PassFile": "/config/pgpass"
    },
    "4": {
      "Name": "Attachment Service DB",
      "Group": "Issue Tracker",
      "Host": "attachment-postgres",
      "Port": 5432,
      "MaintenanceDB": "attachment",
      "Username": "attachment",
      "SSLMode": "prefer",
      "PassFile": "/config/pgpass"
    }
  }
}
EOF
else
  cat > /pgadmin4/servers.json <<EOF
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
      "PassFile": "/config/pgpass"
    }
  }
}
EOF
fi

# Start the original pgAdmin entrypoint
exec /entrypoint.sh
