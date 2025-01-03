import { SubmitHandler, useForm } from "react-hook-form";

import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

import { Container, Grid2, Typography } from "@mui/material";

import {
  RegisterUserInput,
  useRegisterUserMutation,
} from "../../../../api/codegen/gql/graphql";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { PasswordField, TextField } from "../../../../common/components/forms";

export const SignUpForm = () => {
  const snackbar = useSnackbar();
  const [registerUser] = useRegisterUserMutation({
    onCompleted(response) {
      snackbar.success(response.registerUser);
    },
    onError(error) {
      snackbar.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: { displayName: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = async ({
    email,
    password,
    displayName,
  }) => {
    await registerUser({
      variables: { input: { email, password, displayName } },
    });
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
            title="Display Name"
            form={form}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="email"
            title="Email"
            placeholder="Email"
            form={form}
            type="email"
          />
        </Grid2>
        <Grid2 size={12}>
          <PasswordField name="password" title="Password" form={form} />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Continue" />
        </Grid2>
      </Grid2>
    </Container>
  );
};
