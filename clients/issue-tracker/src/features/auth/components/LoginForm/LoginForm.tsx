import { SubmitHandler, useForm } from "react-hook-form";

import { Grid2 } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import type { SignInWithEmailAndPasswordInput } from "@generated/gql/graphql";
import { useSignInWithEmailAndPasswordMutation } from "@generated/gql";
import {
  PasswordField,
  PrimaryButton,
  TextField,
  useSnackbar,
} from "@common";

export const LoginForm = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { mutateAsync: signInWithEmailAndPassword, isPending: loading } =
    useSignInWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInWithEmailAndPasswordInput> = async (
    input,
  ) => {
    try {
      await signInWithEmailAndPassword({ input });
      snackbar.success("Success. You are being redirected");
      setTimeout(() => {
        navigate({ to: "/" });
      }, 2500);
    } catch (error) {
      snackbar.error(
        error instanceof Error ? error.message : "Sign in failed",
      );
    }
  };

  return (
    <Grid2
      container
      rowSpacing={2}
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Grid2 size={12}>
        <TextField name="email" label="Email" placeholder="Email" form={form} />
      </Grid2>

      <Grid2 size={12}>
        <PasswordField
          name="password"
          label="Password"
          form={form}
          showForgotPasswordLink
        />
      </Grid2>

      <Grid2 size={12}>
        <PrimaryButton
          type="submit"
          label="Continue"
          loading={loading}
          isDisabled={loading}
        />
      </Grid2>
    </Grid2>
  );
};
