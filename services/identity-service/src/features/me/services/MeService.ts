import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IMeService } from "@/features/me/services/IMeService";
import type { IIdentityProvider, Identity } from "@/integrations/identity";

@injectable()
export class MeService implements IMeService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
  ) {}

  async getCurrentUser(sessionToken: string): Promise<Identity> {
    return this.identityProvider.getSession(sessionToken);
  }
}
