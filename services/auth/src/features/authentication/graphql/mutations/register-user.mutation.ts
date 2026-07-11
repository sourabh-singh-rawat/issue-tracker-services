import { builder } from "@issue-tracker/graphql-core";
import { container, dataSource } from "@/container";
import { RegisterUserInput } from "../inputs/register-user.input";

builder.mutationFields((t) => ({
  registerUser: t.string({
    args: {
      input: t.arg({ type: RegisterUserInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get("userAuthenticationService");

      await dataSource.transaction(async (manager) => {
        await service.createUserWithEmailAndPassword({ ...input, manager });
      });

      return "User is registered successfully. We have sent you an email";
    },
  }),
}));
