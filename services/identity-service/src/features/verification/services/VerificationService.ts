import { EMAIL_VERIFICATION_STATUS, UserNotFoundError } from "@pine/common";
import { createCloudEvent, IdentityEmailVerifiedEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IIdentityProfileRepository } from "@/features/identities/repositories/IIdentityProfileRepository";
import type { IIdentityRepository } from "@/features/identities/repositories/IIdentityRepository";
import type {
  IVerificationService,
  ResendVerificationEmailInput,
  VerifyEmailInput,
} from "@/features/verification/services/IVerificationService";
import { IdentityProviderUnavailableError, type IIdentityProvider } from "@/integrations/identity";

@injectable()
export class VerificationService implements IVerificationService {
  constructor(
    @inject(TYPES.IdentityProvider)
    private readonly identityProvider: IIdentityProvider,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
    @inject(TYPES.IdentityProfileRepository)
    private readonly identityProfileRepository: IIdentityProfileRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
  ) {}

  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    const idpIdentity = await this.identityProvider.verifyEmail({
      flowId: input.flowId,
      code: input.code,
    });

    const identity = await this.identityRepository.findByIdpId(idpIdentity.id);
    if (!identity) {
      throw new UserNotFoundError();
    }

    const profile = await this.identityProfileRepository.findByIdentityId(identity.id);

    const event = createCloudEvent({
      type: IdentityEmailVerifiedEvent.type,
      version: IdentityEmailVerifiedEvent.version,
      schema: IdentityEmailVerifiedEvent.schema,
      source: "pine/identity-service",
      subject: identity.id,
      data: {
        emailVerificationStatus: EMAIL_VERIFICATION_STATUS.VERIFIED,
        userId: identity.id,
        ...(profile?.displayName ? { displayName: profile.displayName } : {}),
        ...(profile?.photoUrl ? { photoUrl: profile.photoUrl } : {}),
      },
    });

    await this.outboxService.schedule({
      eventId: event.id,
      eventType: event.type,
      eventVersion: IdentityEmailVerifiedEvent.version,
      aggregateType: "identity",
      aggregateId: identity.id,
      payload: event,
    });
  }

  async resendVerificationEmail(input: ResendVerificationEmailInput): Promise<void> {
    try {
      await this.identityProvider.resendVerificationEmail({
        email: input.email,
      });
    } catch (error) {
      if (error instanceof IdentityProviderUnavailableError) {
        throw error;
      }
    }
  }
}
