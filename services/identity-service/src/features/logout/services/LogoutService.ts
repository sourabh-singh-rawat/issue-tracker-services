import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { ILogoutService } from "@/features/logout/services/ILogoutService";
import type { ISessionProvider } from "@/integrations/identity";

@injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @inject(TYPES.SessionProvider)
    private readonly sessionProvider: ISessionProvider,
  ) {}

  async logout(sessionToken: string): Promise<void> {
    await this.sessionProvider.logout(sessionToken);
  }
}
