import { UserAlreadyExists, WORKSPACE_NAME, WORKSPACE_STATUS } from "@pine/common";
import {
  type CloudEvent,
  type IBroker,
  type UserEmailVerifiedData,
  CONSUMERS,
  Streams,
  Subscriber,
  UserEmailVerifiedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { DataSource } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";

@injectable()
export class UserEmailVerifiedSubscriber extends Subscriber<CloudEvent<UserEmailVerifiedData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ISSUE_TRACKER;
  readonly subject = UserEmailVerifiedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<UserEmailVerifiedData>) {
    const event = validateEvent(UserEmailVerifiedEvent, payload);
    const { userId } = event.data!;

    await this.dataSource.transaction(async (manager) => {
      const UserRepo = manager.getRepository(User);
      const WorkspaceRepo = manager.getRepository(Workspace);

      const isAlreadyUser = await UserRepo.findOne({ where: { id: userId } });
      if (isAlreadyUser) throw new UserAlreadyExists();

      await UserRepo.save({ id: userId });
      await WorkspaceRepo.save({
        name: WORKSPACE_NAME.DEFAULT,
        status: WORKSPACE_STATUS.DEFAULT,
        createdById: userId,
      });
    });

    message.ack();
  }
}
