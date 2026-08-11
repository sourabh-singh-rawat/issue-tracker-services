import type { GraphResource } from "./GraphResource";
import type { GraphSubjectSet } from "./GraphSubjectSet";

export interface GraphRelationship {
  object: GraphResource;
  relation: string;
  subject?: GraphResource;
  subjectSet?: GraphSubjectSet;
}
