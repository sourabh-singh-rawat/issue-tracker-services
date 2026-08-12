import type { GraphRelationship } from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationService } from "@/features/authorization/services/IAuthorizationService";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

const assertExclusiveSubject = (relationship: GraphRelationship): void => {
  const hasSubject = relationship.subject !== undefined;
  const hasSubjectSet = relationship.subjectSet !== undefined;
  if (hasSubject === hasSubjectSet) {
    throw new Error("GraphRelationship requires exactly one of subject or subjectSet");
  }
};

@injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {}

  async hasRelationship(relationship: GraphRelationship): Promise<boolean> {
    if (relationship.subject === undefined) {
      throw new Error("hasRelationship requires relationship.subject");
    }

    return this.authorizationGraphProvider.checkPermission(
      relationship.object,
      relationship.relation,
      relationship.subject,
    );
  }

  async ensureRelationship(
    relationship: GraphRelationship,
  ): Promise<{ created: boolean }> {
    assertExclusiveSubject(relationship);

    const existing = await this.authorizationGraphProvider.listRelationships({
      object: relationship.object,
      relation: relationship.relation,
      subject: relationship.subject,
      subjectSet: relationship.subjectSet,
    });

    if (existing.length > 0) {
      return { created: false };
    }

    await this.authorizationGraphProvider.createRelationship(relationship);
    return { created: true };
  }

  async deleteRelationship(
    relationship: GraphRelationship,
  ): Promise<{ deleted: boolean }> {
    assertExclusiveSubject(relationship);

    const existing = await this.authorizationGraphProvider.listRelationships({
      object: relationship.object,
      relation: relationship.relation,
      subject: relationship.subject,
      subjectSet: relationship.subjectSet,
    });

    if (existing.length === 0) {
      return { deleted: false };
    }

    await this.authorizationGraphProvider.deleteRelationship(relationship);
    return { deleted: true };
  }
}
