import { ALL_CAPABILITIES, type CapabilityKey } from "../capabilities";

type CapabilityGroup = Record<string, { key: string }>;

type CapabilitySource = CapabilityGroup | readonly string[];

const isCapabilityGroup = (source: CapabilitySource): source is CapabilityGroup =>
  !Array.isArray(source);

const keysFromSource = (source: CapabilitySource): string[] => {
  if (isCapabilityGroup(source)) {
    return Object.keys(source).map((name) => source[name].key);
  }
  return [...source];
};

export const capabilityKeys = (...sources: readonly CapabilitySource[]): CapabilityKey[] => {
  const keys: CapabilityKey[] = [];
  const seen = new Set<string>();
  for (const source of sources) {
    for (const key of keysFromSource(source)) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key as CapabilityKey);
      }
    }
  }
  return keys;
};

export const withoutActions = (
  source: CapabilitySource,
  ...actions: readonly string[]
): CapabilityKey[] => {
  const excluded = new Set(actions);
  return capabilityKeys(source).filter((key) => {
    const action = key.slice(key.lastIndexOf(":") + 1);
    return !excluded.has(action);
  });
};

export const allCapabilityKeys = (): readonly CapabilityKey[] =>
  ALL_CAPABILITIES.map((capability) => capability.key);

export const readCapabilityKeys = (): readonly CapabilityKey[] =>
  ALL_CAPABILITIES.filter((capability) => capability.action === "read").map(
    (capability) => capability.key,
  );
