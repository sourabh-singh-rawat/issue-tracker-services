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

import schema from "../../../../api/generated/auth.openapi.json";
import { useGenerateTokensMutation } from "../../../../api/generated/identity.api";

export default function LoginForm() {
  const [login] = useGenerateTokensMutation();
  const defaultValues = useMemo(() => ({ email: "", password: "" }), []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSchemas: any = useMemo(
    () =>
      schema.paths["/api/v1/identity/generate-tokens"].post.requestBody.content[
        "application/json"
      ].schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
    // resolver: ajvResolver(defaultSchemas, {
    //   formats: { email: AjvFormats.get("email") },
    // }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    email,
    password,
  }) => {
    login({ body: { email, password } });
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
