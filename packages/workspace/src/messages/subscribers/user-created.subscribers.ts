import {
  Consumers,
  JwtToken,
  Messenger,
  Streams,
  Subscriber,
  UserCreatedPayload,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { WorkspaceService } from "../../services/interfaces/workspace.service";
import { UserEntity } from "../../data/entities";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;

  constructor(
    private messenger: Messenger,
    private workspaceService: WorkspaceService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const {
      userId,
      defaultWorkspaceId,
      isEmailVerified,
      displayName,
      email,
      photoUrl,
      inviteToken,
    } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.email = email;
    newUser.isEmailVerified = isEmailVerified;
    newUser.displayName = displayName;
    newUser.photoUrl = photoUrl;

    if (inviteToken) {
      await this.workspaceService.createDefaultWorkspace(newUser);

      let token: WorkspaceInvitePayload;
      try {
        token = JwtToken.verify(inviteToken, process.env.JWT_SECRET!);
      } catch (err) {
        throw err;
      }

      await this.workspaceService.createWorkspaceMember(
        userId,
        token.workspaceId,
        token.receiverRole,
      );
      message.ack();
      return console.log("Message processing completed");
    }

    await this.workspaceService.createDefaultWorkspace(newUser);
    message.ack();
    return console.log("Message processing completed");
  };
}
