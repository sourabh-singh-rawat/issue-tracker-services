import type { GraphRelationship } from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationService } from "@/features/authorization/services/IAuthorizationService";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

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
}
