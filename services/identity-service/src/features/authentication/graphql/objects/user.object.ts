import { builder } from "@pine/graphql-core";

export const User = builder
  .objectRef<{
    userId: string;
    email: string;
    emailVerificationStatus: string;
    createdAt: Date;
    displayName?: string | null;
    photoUrl?: string | null;
    description?: string | null;
  }>("User")
  .implement({
    fields: (t) => ({
      userId: t.exposeString("userId"),
      email: t.exposeString("email"),
      emailVerificationStatus: t.exposeString("emailVerificationStatus"),
      createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
      displayName: t.exposeString("displayName", { nullable: true }),
      photoUrl: t.exposeString("photoUrl", { nullable: true }),
      description: t.exposeString("description", { nullable: true }),
    }),
  });
