# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7
ARG NODE_VERSION=21.6.1
ARG PNPM_VERSION=8.15.4

FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# Copy only necessary files for installing dependencies.
FROM base AS build
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install dependencies
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm -F activity deploy /build/activity
RUN pnpm -F attachment deploy /build/attachment
RUN pnpm -F email deploy /build/email
RUN pnpm -F identity deploy /build/identity
RUN pnpm -F issue deploy /build/issue
RUN pnpm -F project deploy /build/project
RUN pnpm -F user deploy /build/user
RUN pnpm -F workspace deploy /build/workspace


FROM base AS activity
COPY --from=build /build/activity /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start


FROM base AS attachment
COPY --from=build /build/attachment /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start

FROM base AS email
COPY --from=build /build/email /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start


FROM base AS identity
COPY --from=build /build/identity /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start

FROM base AS issue
COPY --from=build /build/issue /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start


FROM base AS project
COPY --from=build /build/project /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start

FROM base AS user
COPY --from=build /build/user /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start

FROM base AS workspace
COPY --from=build /build/workspace /usr/src/app
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD pnpm start



