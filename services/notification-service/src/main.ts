import "reflect-metadata";

import { broker, container, initializeDb, logger, TYPES } from "@/bootstrap";
import { IdentitySyncConsumer } from "@/features/identities";

export { container, db } from "@/bootstrap";

const main = async () => {
  await initializeDb();
  await broker.init();

  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  logger.info("Notification service started");
};

main().catch((error) => {
  console.log(error);
});
