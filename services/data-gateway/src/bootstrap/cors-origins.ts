import { env } from "./env";

const withLoopbackVariants = (url: string): string[] => {
  try {
    const parsed = new URL(url);
    const variants = [parsed.origin];
    if (parsed.hostname === "localhost") {
      const loopback = new URL(parsed.origin);
      loopback.hostname = "127.0.0.1";
      variants.push(loopback.origin);
    } else if (parsed.hostname === "127.0.0.1") {
      const loopback = new URL(parsed.origin);
      loopback.hostname = "localhost";
      variants.push(loopback.origin);
    }
    return variants;
  } catch {
    return [url];
  }
};

export const getCorsOrigins = (): string[] => {
  const base = [
    env.IDENTITY_WEB_URL,
    env.ERP_WEB_URL,
    env.VITE_PLATFORM_WEB_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  const origins = new Set<string>();
  for (const value of base) {
    for (const variant of withLoopbackVariants(value)) {
      origins.add(variant);
    }
  }
  return [...origins];
};

export const isAllowedCorsOrigin = (origin: string | undefined, allowed: string[]): boolean => {
  if (!origin) return false;
  try {
    const originUrl = new URL(origin).origin;
    return allowed.some((item) => {
      try {
        return new URL(item).origin === originUrl;
      } catch {
        return item === origin;
      }
    });
  } catch {
    return allowed.includes(origin);
  }
};
