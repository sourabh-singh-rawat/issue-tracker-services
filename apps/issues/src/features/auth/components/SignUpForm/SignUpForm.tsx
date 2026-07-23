import { SubmitHandler, useForm } from "react-hook-form";

import { PasswordField, PrimaryButton, TextField, useSnackbar } from "@common";

import { Container, Grid2, Typography } from "@mui/material";

import type { RegisterUserInput } from "@generated/gql/graphql";
import { useRegisterUserWithEmailAndPasswordMutation } from "@generated/gql";

export const SignUpForm = () => {
  const snackbar = useSnackbar();
  const { mutateAsync: registerUserWithEmailAndPassword } =
    useRegisterUserWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: { displayName: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = async ({ email, password, displayName }) => {
    try {
      const response = await registerUserWithEmailAndPassword({
        input: { email, password, displayName },
      });
      snackbar.success(response.registerUserWithEmailAndPassword);
    } catch (error) {
      snackbar.error(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <Container component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Grid2 container rowSpacing={2} marginTop={4}>
        <Grid2 size={12}>
          <Typography variant="h1">Sign Up</Typography>
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="displayName"
            placeholder="Display Name"
            label="Display Name"
            form={form}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField name="email" label="Email" placeholder="Email" form={form} type="email" />
        </Grid2>
        <Grid2 size={12}>
          <PasswordField name="password" label="Password" form={form} />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Continue" />
        </Grid2>
      </Grid2>
    </Container>
  );
};
