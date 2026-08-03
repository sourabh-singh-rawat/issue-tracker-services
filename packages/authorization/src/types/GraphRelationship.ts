import type { GraphResource } from "./GraphResource";

export interface GraphRelationship {
  object: GraphResource;
  relation: string;
  subject: GraphResource;
}
