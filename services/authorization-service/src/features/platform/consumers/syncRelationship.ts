import type { GraphRelationship } from "@pine/authorization";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

export const ensureRelationship = async (
  provider: IAuthorizationGraphProvider,
  relationship: GraphRelationship,
): Promise<void> => {
  const existing = await provider.listRelationships({
    object: relationship.object,
    relation: relationship.relation,
    subject: relationship.subject,
    subjectSet: relationship.subjectSet,
  });

  if (existing.length === 0) {
    await provider.createRelationship(relationship);
  }
};

export const removeRelationship = async (
  provider: IAuthorizationGraphProvider,
  relationship: GraphRelationship,
): Promise<void> => {
  const existing = await provider.listRelationships({
    object: relationship.object,
    relation: relationship.relation,
    subject: relationship.subject,
    subjectSet: relationship.subjectSet,
  });

  if (existing.length > 0) {
    await provider.deleteRelationship(relationship);
  }
};
