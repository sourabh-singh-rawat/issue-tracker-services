import "reflect-metadata";

import { closeDb, initializeDb } from "@/bootstrap";
import { logger } from "@/bootstrap/logger";

const seed = async (): Promise<void> => {
  await initializeDb();
  logger.info("Seed completed");
};

seed()
  .then(async () => {
    await closeDb();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error("Seed failed", error);
    await closeDb().catch(() => undefined);
    process.exit(1);
  });
