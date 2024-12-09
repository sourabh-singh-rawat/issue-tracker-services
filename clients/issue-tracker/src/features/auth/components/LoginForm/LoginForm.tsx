import React, { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPasswordMutation } from "../../../../api/codegen/gql/graphql";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import PasswordField from "../../../../common/components/forms/PasswordField";
import TextField from "../../../../common/components/forms/TextField";

export default function LoginForm() {
  const messageBar = useSnackbar();
  const defaultValues = useMemo(() => ({ email: "", password: "" }), []);
  const navigate = useNavigate();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation({
    onError(error) {
      messageBar.showError(error.message);
    },
    onCompleted() {
      messageBar.showSuccess("Success. You are being redirected");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    },
  });

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (
    { email, password },
  ) => {
    await signInWithEmailAndPassword({
      variables: { input: { email, password } },
    });
  };

  return (
    <MuiContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <MuiGrid container rowSpacing={2} marginTop={4}>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h1">Welcome back</MuiTypography>
          <MuiTypography variant="subtitle1">
            Sign in to your account
          </MuiTypography>
        </MuiGrid>

        <MuiGrid item xs={12}>
          <TextField
            name="email"
            title="Email"
            control={control}
            formState={formState}
          />
        </MuiGrid>

        <MuiGrid item xs={12}>
          <PasswordField
            name="password"
            title="Password"
            control={control}
            formState={formState}
          />
        </MuiGrid>

        <MuiGrid item xs={12}>
          <PrimaryButton type="submit" label="Login" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
