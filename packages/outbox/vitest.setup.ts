import { vi } from "vitest";

vi.mock("node:timers/promises", () => ({
  setTimeout: (ms?: number, value?: unknown, options?: { signal?: AbortSignal }) =>
    new Promise((resolve, reject) => {
      const signal = options?.signal;
      if (signal?.aborted) {
        reject(signal.reason ?? new DOMException("The operation was aborted", "AbortError"));
        return;
      }

      const timer = globalThis.setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve(value);
      }, ms ?? 0);

      const onAbort = () => {
        globalThis.clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
        reject(signal?.reason ?? new DOMException("The operation was aborted", "AbortError"));
      };

      signal?.addEventListener("abort", onAbort, { once: true });
    }),
}));
