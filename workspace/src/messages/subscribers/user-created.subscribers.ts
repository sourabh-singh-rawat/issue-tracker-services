import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { Services } from "../../app/container.config";
import { UserEntity, WorkspaceEntity } from "../../data/entities";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;
  private readonly _context;
  private readonly _userRepository;
  private readonly _workspaceRepository;

  constructor(container: Services) {
    super(container.messageServer.natsClient);

    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._workspaceRepository = container.workspaceRepository;
  }

  onMessage = async (
    message: JsMsg,
    payload: UserCreatedPayload,
  ): Promise<void> => {
    const newUser = new UserEntity();
    newUser.id = payload.userId;
    newUser.email = payload.email;
    newUser.defaultWorkspaceId = payload.defaultWorkspaceId;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = payload.defaultWorkspaceId;
    newWorkspace.name = "default";
    newWorkspace.ownerUserId = payload.userId;

    await this._context.transaction(async (queryRunner) => {
      await this._userRepository.save(newUser, { queryRunner });
      await this._workspaceRepository.save(newWorkspace, { queryRunner });
    });

    message.ack();
    console.log("Message processing completed");
  };
}
