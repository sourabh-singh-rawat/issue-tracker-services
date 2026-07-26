import { env } from "./env";

export const getCorsOrigins = (): string[] => {
  const base = [
    env.ISSUES_WEB_URL,
    env.IDENTITY_WEB_URL,
    env.INVENTORY_WEB_URL,
    env.API_GATEWAY_URL,
  ];

  const origins = new Set<string>();
  for (const value of base) {
    for (const variant of withLoopbackVariants(value)) {
      origins.add(variant);
    }
  }
  return [...origins];
};

export const isAllowedCorsOrigin = (origin: string | undefined, allowed: string[]): boolean =>
  Boolean(origin && allowed.includes(origin));

const withLoopbackVariants = (url: string): string[] => {
  try {
    const parsed = new URL(url);
    const variants = [parsed.origin];
    if (parsed.hostname === "localhost") {
      parsed.hostname = "127.0.0.1";
      variants.push(parsed.origin);
    } else if (parsed.hostname === "127.0.0.1") {
      parsed.hostname = "localhost";
      variants.push(parsed.origin);
    }
    return variants;
  } catch {
    return [url];
  }
};
