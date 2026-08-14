import {
  PLATFORM_RESOURCE,
  PLATFORM_TENANT,
  TENANT,
  TENANT_PLATFORM,
} from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type TenantCreatedData,
  type TenantDeletedData,
  Consumer,
  TenantCreatedEvent,
  TenantDeletedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class TenantSyncConsumer extends Consumer<
  CloudEvent<TenantCreatedData | TenantDeletedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-tenant-sync";
  readonly subjects = [TenantCreatedEvent.type, TenantDeletedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {
    super(broker.client);
  }

  async onMessage(
    message: JsMsg,
    payload: CloudEvent<TenantCreatedData | TenantDeletedData>,
  ): Promise<void> {
    if (payload.type === TenantCreatedEvent.type) {
      const event = validateEvent(TenantCreatedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      await this.ensureRelationship(
        this.platformTenantRelationship(data.platformId, data.id),
      );
      await this.ensureRelationship(
        this.tenantPlatformRelationship(data.platformId, data.id),
      );
      message.ack();
      return;
    }

    if (payload.type === TenantDeletedEvent.type) {
      const event = validateEvent(TenantDeletedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      await this.removeRelationship(
        this.platformTenantRelationship(data.platformId, data.id),
      );
      await this.removeRelationship(
        this.tenantPlatformRelationship(data.platformId, data.id),
      );
      message.ack();
      return;
    }

    message.ack();
  }

  private platformTenantRelationship = (platformId: string, tenantId: string) => ({
    object: { type: PLATFORM_RESOURCE.name, id: platformId },
    relation: PLATFORM_TENANT,
    subject: { type: TENANT.name, id: tenantId },
  });

  private tenantPlatformRelationship = (platformId: string, tenantId: string) => ({
    object: { type: TENANT.name, id: tenantId },
    relation: TENANT_PLATFORM,
    subject: { type: PLATFORM_RESOURCE.name, id: platformId },
  });

  private ensureRelationship = async (
    relationship: ReturnType<TenantSyncConsumer["platformTenantRelationship"]>,
  ): Promise<void> => {
    const existing = await this.authorizationGraphProvider.listRelationships({
      object: relationship.object,
      relation: relationship.relation,
      subject: relationship.subject,
    });

    if (existing.length === 0) {
      await this.authorizationGraphProvider.createRelationship(relationship);
    }
  };

  private removeRelationship = async (
    relationship: ReturnType<TenantSyncConsumer["platformTenantRelationship"]>,
  ): Promise<void> => {
    const existing = await this.authorizationGraphProvider.listRelationships({
      object: relationship.object,
      relation: relationship.relation,
      subject: relationship.subject,
    });

    if (existing.length > 0) {
      await this.authorizationGraphProvider.deleteRelationship(relationship);
    }
  };
}
