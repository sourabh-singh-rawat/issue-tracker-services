import { builder } from "@pine/graphql-core";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IRegistrationService } from "@/features/registration/services/IRegistrationService";
import { RegisterUserInput } from "@/features/registration/graphql/inputs/RegisterUserInput";

builder.mutationFields((t) => ({
  registerUserWithEmailAndPassword: t.string({
    args: {
      input: t.arg({ type: RegisterUserInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IRegistrationService>(TYPES.RegistrationService);

      await service.registerUserWithEmailAndPassword(input.email, input.password);

      return "Your request has been received.";
    },
  }),
}));
