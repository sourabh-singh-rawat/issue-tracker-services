import { lexicographicSortSchema, printSchema } from "graphql";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

export const writeSchemaToDist = async (): Promise<void> => {
  const { schema } = await import("@/graphql/schema");
  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));
};
