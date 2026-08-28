import { configureTls } from "@pine/common";
import { env } from "@/bootstrap/env";
import "reflect-metadata";

configureTls({
  caPath: env.CA_CERT_PATH,
  certPath: env.ATTACHMENT_SCANNER_SERVICE_TLS_CERT_PATH,
  keyPath: env.ATTACHMENT_SCANNER_SERVICE_TLS_KEY_PATH,
});

import type { IOutboxCleanupWorker, IOutboxWorker } from "@pine/outbox";
import { broker, container, initializeDb, logger, TYPES } from "@/bootstrap";
import { AttachmentQuarantinedConsumer } from "@/features/attachment-scanner";

export { container, db } from "@/bootstrap";

const main = async () => {
  await initializeDb();
  await broker.init();

  void container.get<IOutboxWorker>(TYPES.OutboxWorker).start();
  void container.get<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker).start();
  void container.get<AttachmentQuarantinedConsumer>(TYPES.AttachmentQuarantinedConsumer).start();
  logger.info("Attachment scanner service started");
};

main().catch((error) => {
  console.log(error);
});
