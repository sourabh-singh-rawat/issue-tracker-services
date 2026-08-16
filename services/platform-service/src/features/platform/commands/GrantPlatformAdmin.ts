import { ADMIN } from "@pine/authorization";
import type { ICommand } from "@pine/common";
import type {
  IPlatformMemberService,
  PlatformMember,
} from "@/features/platform/services/IPlatformMemberService";

export class GrantPlatformAdmin implements ICommand<string, PlatformMember> {
  constructor(private readonly platformMemberService: IPlatformMemberService) {}

  async execute(identityId: string): Promise<PlatformMember> {
    return this.platformMemberService.create(
      {
        relation: ADMIN,
        identityId,
      },
      identityId,
      { skipAuthorization: true },
    );
  }
}
