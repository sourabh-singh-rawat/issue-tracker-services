export const expandLoopbackOrigins = (origins: readonly string[]): string[] => {
  const result = new Set<string>();
  for (const origin of origins) {
    result.add(origin);
    try {
      const parsed = new URL(origin);
      if (parsed.hostname === "localhost") {
        const loopback = new URL(parsed.origin);
        loopback.hostname = "127.0.0.1";
        result.add(loopback.origin);
      } else if (parsed.hostname === "127.0.0.1") {
        const loopback = new URL(parsed.origin);
        loopback.hostname = "localhost";
        result.add(loopback.origin);
      }
    } catch {}
  }
  return [...result];
};
