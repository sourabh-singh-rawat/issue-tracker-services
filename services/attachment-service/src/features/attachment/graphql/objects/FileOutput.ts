import { builder } from "@pine/server";
import type { Attachment } from "@/db";

export const FileOutput = builder
  .objectRef<Attachment>("FileOutput")
  .implement({
    fields: (t) => ({
      id: t.exposeString("id"),
      tenantId: t.exposeString("tenantId"),
      currentVersionId: t.exposeString("currentVersionId", { nullable: true }),
      status: t.exposeString("status"),
      securityStatus: t.exposeString("securityStatus"),
      createdBy: t.exposeString("createdBy"),
    }),
  });
