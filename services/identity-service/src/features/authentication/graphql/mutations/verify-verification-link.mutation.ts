import { builder } from "@pine/graphql-core";
import { container, dataSource } from "@/container";
import { VerifyVerificationLinkInput } from "../inputs/verify-verification-link.input";

builder.mutationFields((t) => ({
  verifyVerificationLink: t.string({
    args: {
      input: t.arg({ type: VerifyVerificationLinkInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const { token } = input;
      const service = container.get("userAuthenticationService");

      await dataSource.transaction(async (manager) => {
        await service.verifyVerificationLink({ token, manager });
      });

      return "Thanks, Your email is verified successfully";
    },
  }),
}));
