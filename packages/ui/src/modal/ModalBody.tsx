import type { ReactNode } from "react";

export interface ModalBodyProps {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return children;
}

export default ModalBody;
