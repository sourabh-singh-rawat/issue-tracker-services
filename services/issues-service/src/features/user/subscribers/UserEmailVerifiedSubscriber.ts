import { UserAlreadyExists, WORKSPACE_NAME, WORKSPACE_STATUS } from "@pine/common";
import {
  type IBroker,
  CONSUMERS,
  SUBJECTS,
  Streams,
  Subscriber,
  UserEmailVerifiedData,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { DataSource } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";

@injectable()
export class UserEmailVerifiedSubscriber extends Subscriber<UserEmailVerifiedData> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ISSUE_TRACKER;
  readonly subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: UserEmailVerifiedData) {
    const { userId } = payload;

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
