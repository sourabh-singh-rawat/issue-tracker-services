# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.6.1
ARG PNPM_VERSION=8.15.4

# Stage 1: Setup base
# Base image with contains node and npm.
FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# The working directory for base stage
WORKDIR /usr/src/app

# Copy the source files in the base stage.
COPY . .


# Stage 2: Install node_modules and build the typescript code to javascript.
FROM base AS build

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage a bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run -r build


# Stage 3: Activity Service
FROM base AS activity
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F activity run start


# Stage 3: Attachment Service
FROM base AS attachment
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F attachment run start


# Stage 3: Email Service
FROM base AS email
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F email run start


# Stage 3: Identity Service
FROM base AS identity
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F identity run start


# Stage 3: Issue Service
FROM base AS issue
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F issue run start


# Stage 3: Project Service
FROM base AS project
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F project run start


# Stage 3: User Service
FROM base AS user
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F user run start


# Stage 3: Workspace Service
FROM base AS workspace
COPY --from=build /usr/src/app /usr/src/app
USER node
EXPOSE 4000
CMD pnpm -F workspace run start