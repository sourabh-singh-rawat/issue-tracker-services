import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useMessageBar } from "../../../message-bar/hooks";
import { useRegisterUserMutation } from "../../../../api/generated/user.api";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import TextField from "../../../../common/components/forms/TextField";
import PasswordField from "../../../../common/components/forms/PasswordField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { authService } from "../../../../app/trpc";

export default function SignUpForm() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  const registerUser = authService.registerUser.useMutation({
    onError: (error) => {
      messageBar.showError(error.message);
    },
  });
  const messageBar = useMessageBar();

  const defaultValues = useMemo(
    () => ({ displayName: "", email: "", password: "" }),
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    email,
    password,
    displayName,
  }) => {
    if (inviteToken) {
      // return signup({
      //   body: { email, password, displayName },
      //   workspaceInviteToken: inviteToken,
      // });
    }
    registerUser.mutate({ email, password, displayName });
  };

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
