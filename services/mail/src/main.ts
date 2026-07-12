import "./env";
import "reflect-metadata";

import { AwilixDi } from "@issue-tracker/server-core";
import {
  RegisteredServices,
  broker,
  container,
  orm,
} from "./container";

export { container, dataSource } from "./container";

const startSubscriptions = (di: AwilixDi<RegisteredServices>) => {
  di.get("userRegisteredSubscriber").fetchMessages();
  di.get("projectMemberCreatedSubscriber").fetchMessages();
  di.get("workspaceMemberInvitedSubscriber").fetchMessages();
};

const main = async () => {
  await orm.init();
  await broker.init();
  container.init();
  startSubscriptions(container);
};

main().catch((error) => {
  console.log(error);
});
