import swagger from "@fastify/swagger";
import type { FastifyInstance } from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { env } from "@/bootstrap/env";

export const registerSwagger = async (server: FastifyInstance): Promise<void> => {
  await server.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Organization Service",
        version: "0.0.0",
        description: "Organization and membership APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.ORGANIZATION_SERVICE_URL }],
      tags: [
        { name: "organizations", description: "Organization end-points" },
        { name: "memberships", description: "Membership end-points" },
      ],
    },
  });
};

export const writeOpenApi = (server: FastifyInstance): void => {
  const openapi = server.swagger({ yaml: false });
  const openapiPath = path.join(process.cwd(), "dist", "openapi.json");
  mkdirSync(path.dirname(openapiPath), { recursive: true });
  writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));
};
