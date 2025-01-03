import { SubmitHandler, useForm } from "react-hook-form";

import { Container, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  SignInWithEmailAndPasswordInput,
  useSignInWithEmailAndPasswordMutation,
} from "../../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { PasswordField, TextField } from "../../../../common/components/forms";

export default function LoginForm() {
  const messageBar = useSnackbar();
  const navigate = useNavigate();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation({
    onError(error) {
      messageBar.error(error.message);
    },
    onCompleted() {
      messageBar.success("Success. You are being redirected");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInWithEmailAndPasswordInput> = async (
    input,
  ) => {
    await signInWithEmailAndPassword({ variables: { input } });
  };

  return (
    <Container component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Grid2 container rowSpacing={2} marginTop={4}>
        <Grid2 size={12}>
          <Typography variant="h1">Welcome back</Typography>
          <Typography variant="subtitle1">Sign in to your account</Typography>
        </Grid2>

        <Grid2 size={12}>
          <TextField name="email" title="Email" form={form} />
        </Grid2>

        <Grid2 size={12}>
          <PasswordField name="password" title="Password" form={form} />
        </Grid2>

        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Login" />
        </Grid2>
      </Grid2>
    </Container>
  );
}
