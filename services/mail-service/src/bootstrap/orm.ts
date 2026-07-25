import { PostgresTypeorm } from "@pine/orm";
import { dataSource } from "@/bootstrap/data-source";
import { logger } from "@/bootstrap/logger";

export const orm = new PostgresTypeorm(dataSource, logger);
