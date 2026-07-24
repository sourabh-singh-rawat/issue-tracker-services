import { type SubmitHandler, useForm } from "react-hook-form";
import { Container, Grid2, Typography } from "@mui/material";
import { useRegisterWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { PasswordField, PrimaryButton, TextField, useSnackbar } from "@shared";

type SignUpFormValues = {
  displayName: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const snackbar = useSnackbar();
  const { mutateAsync: registerUser } = useRegisterWithEmailAndPasswordMutation();

  const form = useForm<SignUpFormValues>({
    defaultValues: { displayName: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({ email, password }) => {
    try {
      const response = await registerUser({ body: { email, password } });
      snackbar.success(response?.message ?? "Registration successful");
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
