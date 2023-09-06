# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.17.0

# Stage 0: production
FROM node:${NODE_VERSION}-alpine AS production

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

COPY ./sourabhrawatcc-core-utils-0.2.0.tgz .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD npm start

# Stage 1: development
FROM production AS development

# Node environment to development
ENV NODE_ENV development

# Switching to root for installing the application
USER root

COPY --from=production /usr/src/app/package.json .
COPY --from=production /usr/src/app/package-lock.json .
RUN --mount=type=cache,target=/root/.npm \
    npm i

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD npm start
