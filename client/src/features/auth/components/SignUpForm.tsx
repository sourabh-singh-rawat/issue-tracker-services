import React, { useEffect, useMemo } from "react";
import {
  Error,
  useRegisterMutation,
} from "../../../api/generated/identity.api";
import { useMessageBar } from "../../message-bar/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import ajvFormat from "ajv-formats";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import TextField from "../../../common/components/forms/TextField";
import PasswordField from "../../../common/components/forms/PasswordField";
import PrimaryButton from "../../../common/components/buttons/PrimaryButton";

import openapi from "../../../api/generated/openapi.json";

export function SignUpForm() {
  const [registerUser, { error, status }] = useRegisterMutation();
  const messageBar = useMessageBar();

  const defaultValues = useMemo(
    () => ({ displayName: "", email: "", password: "" }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSchemas: any = useMemo(
    () => openapi.components.schemas["user-body-post"],
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: ajvFormat.get("email") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    email,
    password,
    displayName,
  }) => {
    registerUser({
      body: { email, password, displayName },
    });
  };

  useEffect(() => {
    if (error) {
      messageBar.showError((error.data as Error).errors[0].message);
    }
  }, [status]);

  return (
    <MuiContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <MuiGrid container rowSpacing={2} marginTop={4}>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h1">
            Get started with Issue Tracker
          </MuiTypography>
          <MuiTypography>
            Create your account and start using Issue Tracker.
          </MuiTypography>
          <MuiTypography variant="body2">
            Already have an account?
          </MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="displayName"
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
          <PrimaryButton type="submit" label="Sign up for free" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}