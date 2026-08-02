import type { ResourceDefinition } from "./ResourceDefinition";
import { ALL_CAPABILITIES } from "./capabilities";
import { ALL_DYNAMIC_RESOURCES } from "./dynamic";

export const ALL_RESOURCES = [
  ...ALL_DYNAMIC_RESOURCES,
  ...ALL_CAPABILITIES,
] as const satisfies readonly ResourceDefinition[];
