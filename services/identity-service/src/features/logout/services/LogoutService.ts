import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { ILogoutService } from "@/features/logout/services/ILogoutService";
import type { IIdentityProvider } from "@/integrations/identity";

@injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
  ) {}

  async logout(sessionToken: string): Promise<void> {
    await this.identityProvider.logout(sessionToken);
  }
}
