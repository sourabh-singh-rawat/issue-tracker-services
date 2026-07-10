# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.6.1
ARG PNPM_VERSION=9.0.4

# Stage 1: Setup base
FROM node:${NODE_VERSION}-alpine AS base

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY . .


# Stage 2: Install dependencies and build with Nx (task graph + cache-friendly)
FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Build all server packages/services once; individual runtime stages only need their graph outputs.
# Prefer per-service targets below when optimizing layer cache further.
RUN pnpm exec nx run-many -t build \
    --projects=attachment,mail,auth,issue-tracker,@issue-tracker/common,@issue-tracker/comm,@issue-tracker/event-bus,@issue-tracker/orm,@issue-tracker/security,@issue-tracker/server-core


# Stage 3: Attachment Service
FROM base AS attachment
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F attachment start


# Stage 3: Email / Mail Service
FROM base AS email
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F mail start


# Stage 3: Auth Service
FROM base AS auth
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F auth start


# Stage 3: Issue Tracker Service
FROM base AS issue-tracker
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F issue-tracker start
