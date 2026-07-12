import { builder } from "@issue-tracker/graphql-core";
import { container } from "@/container";
import { SignInWithEmailAndPasswordInput } from "../inputs/sign-in-with-email-and-password.input";

builder.mutationFields((t) => ({
  signInWithEmailAndPassword: t.boolean({
    args: {
      input: t.arg({ type: SignInWithEmailAndPasswordInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get("userAuthenticationService");
      const authDataSource = container.get("dataSource");

      const { accessToken } = await authDataSource.transaction(
        async (manager) => {
          return await service.signInWithEmailAndPassword({
            ...input,
            manager,
          });
        },
      );

      // Only the short-lived access token is sent to the client.
      // Refresh tokens stay in the database and are never set as cookies.
      ctx.rep.setCookie("accessToken", accessToken);

      return true;
    },
  }),
}));
