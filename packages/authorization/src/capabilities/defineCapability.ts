import type { CapabilityDefinition } from "./CapabilityDefinition";

export const defineCapability = <
  const S extends string,
  const R extends string,
  const A extends string,
>(
  service: S,
  resource: R,
  action: A,
): CapabilityDefinition & {
  key: `${S}:${R}:${A}`;
  service: S;
  resource: R;
  action: A;
} =>
  ({
    key: `${service}:${resource}:${action}`,
    service,
    resource,
    action,
  }) as const;
