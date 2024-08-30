import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";

import { useMessageBar } from "../../../message-bar/hooks";
import { useRegisterUserMutation } from "../../../../api/generated/user.api";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import TextField from "../../../../common/components/forms/TextField";
import PasswordField from "../../../../common/components/forms/PasswordField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

import schema from "../../../../api/generated/auth.openapi.json";

export default function SignUpForm() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  const [signup, { error, status }] = useRegisterUserMutation();
  const messageBar = useMessageBar();

  const defaultValues = useMemo(
    () => ({ displayName: "", email: "", password: "" }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSchemas: any = useMemo(
    () =>
      schema.paths["/api/v1/users/register"].post.requestBody.content[
        "application/json"
      ].schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: AjvFormats.get("email") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    email,
    password,
    displayName,
  }) => {
    if (inviteToken) {
      return signup({ body: { email, password, displayName }, inviteToken });
    }
    signup({ body: { email, password, displayName } });
  };

  useEffect(() => {
    if (error) {
      messageBar.showError("Some error");
    }
  }, [status]);

  return (
    <MuiContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <MuiGrid container rowSpacing={2} marginTop={4}>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h1">Get Started</MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="displayName"
            placeholder=""
            title="Display Name"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="email"
            title="Email"
            control={control}
            formState={formState}
            type="email"
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
          <PrimaryButton type="submit" label="Continue" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
