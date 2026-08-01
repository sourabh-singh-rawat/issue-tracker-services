import "reflect-metadata";
import "@/bootstrap/env";

import { TYPES, broker, container, initializeDb } from "@/bootstrap";
import { IdentitySyncConsumer } from "@/features/identities";

export { container, db } from "@/bootstrap";

const startConsumers = () => {
  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
};

const main = async () => {
  await initializeDb();
  await broker.init();
  startConsumers();
};

main().catch((error) => {
  console.log(error);
});
