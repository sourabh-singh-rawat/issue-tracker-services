import type { ResourceDefinition } from "../ResourceDefinition";
import { ORGANIZATION } from "./Organization";
import { ROLE } from "./Role";

export const ALL_DYNAMIC_RESOURCES = [
  ORGANIZATION,
  ROLE,
] as const satisfies readonly ResourceDefinition[];
