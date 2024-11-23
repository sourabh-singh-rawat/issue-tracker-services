import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import TextField from "../../../../common/components/forms/TextField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import PasswordField from "../../../../common/components/forms/PasswordField";

import { client } from "../../../..";

export default function LoginForm() {
  const defaultValues = useMemo(() => ({ email: "", password: "" }), []);
 

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    email,
    password,
  }) => {
    await client.signInWithEmailAndPassword.mutate({ email, password });
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
