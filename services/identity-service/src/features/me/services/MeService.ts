import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IMeService } from "@/features/me/services/IMeService";
import type { ISessionProvider, Identity } from "@/integrations/identity";

@injectable()
export class MeService implements IMeService {
  constructor(
    @inject(TYPES.SessionProvider)
    private readonly sessionProvider: ISessionProvider,
  ) {}

  async getCurrentUser(sessionToken: string): Promise<Identity> {
    return this.sessionProvider.getSession(sessionToken);
  }
}
