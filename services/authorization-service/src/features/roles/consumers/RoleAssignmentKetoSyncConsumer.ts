import { ROLE } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type RoleAssignmentCreatedData,
  Streams,
  Consumer,
  RoleAssignmentCreatedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class RoleAssignmentKetoSyncConsumer extends Consumer<
  CloudEvent<RoleAssignmentCreatedData>
> {
  readonly stream = Streams.AUTHORIZATION;
  readonly consumer = "authorization-role-assignment-keto-sync";
  readonly subjects = [RoleAssignmentCreatedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<RoleAssignmentCreatedData>) {
    const event = validateEvent(RoleAssignmentCreatedEvent, payload);
    const { subjectType, subjectId, roleId } = event.data!;

    const relationship = {
      object: { type: ROLE.key, id: roleId },
      relation: ROLE.relations.assignee,
      subject: { type: subjectType, id: subjectId },
    };

    const existing = await this.authorizationGraphProvider.listRelationships({
      object: relationship.object,
      relation: relationship.relation,
      subject: relationship.subject,
    });

    if (existing.length === 0) {
      await this.authorizationGraphProvider.createRelationship(relationship);
    }

    message.ack();
  }
}
