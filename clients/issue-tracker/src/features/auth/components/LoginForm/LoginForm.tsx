import { SubmitHandler, useForm } from "react-hook-form";

import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  SignInWithEmailAndPasswordInput,
  useSignInWithEmailAndPasswordMutation,
} from "../../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { PasswordField, TextField } from "../../../../common/components/forms";

export const LoginForm = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation({
    onError(error) {
      snackbar.error(error.message);
    },
    onCompleted() {
      snackbar.success("Success. You are being redirected");
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
        <PrimaryButton type="submit" label="Continue" />
      </Grid2>
    </Grid2>
  );
};
