import type { Resource } from "../resources";

export const permissionKey = (namespace: Resource, permission: string): string =>
  `${namespace}:${permission}`;
