import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useMessageBar } from "../../../message-bar/hooks";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import TextField from "../../../../common/components/forms/TextField";
import PasswordField from "../../../../common/components/forms/PasswordField";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import {
  RegisterUserInput,
  useRegisterUserMutation,
} from "../../../../api/codegen/gql/graphql";

export default function SignUpForm() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  const messageBar = useMessageBar();
  const [registerUser] = useRegisterUserMutation({
    onCompleted(response) {
      messageBar.showSuccess(response.registerUser);
    },
    onError(error) {
      messageBar.showError(error.message);
    },
  });

  const defaultValues: RegisterUserInput = useMemo(
    () => ({ displayName: "", email: "", password: "" }),
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = async ({
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
    await registerUser({
      variables: { input: { email, password, displayName } },
    });
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
