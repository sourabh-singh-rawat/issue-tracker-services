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

      const { accessToken, refreshToken } = await authDataSource.transaction(
        async (manager) => {
          return await service.signInWithEmailAndPassword({
            ...input,
            manager,
          });
        },
      );

      ctx.rep.setCookie("accessToken", accessToken);
      ctx.rep.setCookie("refreshToken", refreshToken);

      return true;
    },
  }),
}));
