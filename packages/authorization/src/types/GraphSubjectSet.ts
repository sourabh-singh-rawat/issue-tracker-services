import type { GraphNamespace } from "./GraphNamespace";

export interface GraphSubjectSet {
  namespace: GraphNamespace;
  id: string;
  relation: string;
}
