import type { Container } from "inversify";

let containerRef: Container | undefined;

export const setContainer = (container: Container): void => {
  containerRef = container;
};

export const getContainer = (): Container => {
  if (!containerRef) {
    throw new Error("DI container is not initialized");
  }
  return containerRef;
};
