import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IMeService } from "@/features/me/services/IMeService";
import type { ISessionService } from "@/features/session/services/ISessionService";
import type { Identity } from "@/integrations/identity";

@injectable()
export class MeService implements IMeService {
  constructor(
    @inject(TYPES.SessionService)
    private readonly sessionService: ISessionService,
  ) {}

  async getCurrentUser(sessionToken: string): Promise<Identity> {
    return this.sessionService.getSession(sessionToken);
  }
}
