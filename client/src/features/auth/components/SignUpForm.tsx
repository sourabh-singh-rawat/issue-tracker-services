import React, { useEffect } from "react";
import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import TextField from "../../../common/components/forms/TextField";
import PrimaryButton from "../../../common/components/buttons/PrimaryButton";

import { useRegisterMutation } from "../../../api/generated/identity.api";
// import useMessageBar from "../../message-bar/hooks/useMessageBar";
import { useForm, SubmitHandler } from "react-hook-form";

// import Ajv from "ajv";

// const ajv = new Ajv();

// const schema = {
//   type: "object",
//   properties: {
//     email: {
//       type: "string",
//       minLength: 1,
//       maxLength: 80,
//       // format: "email",
//     },
//     password: {
//       type: "string",
//       minLength: 8,
//       maxLength: 64,
//       pattern:
//         "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])(?!.*\\s).{8,}$",
//     },
//     displayName: {
//       type: "string",
//       minLength: 1,
//       maxLength: 255,
//     },
//   },
// };

export function SignUpForm() {
  const [registerUser, { error, status }] = useRegisterMutation();
  // const messageBar = useMessageBar();

  const defaultValues = {
    displayName: "",
    email: "",
    password: "",
    twitchName: "",
  };
  type DefaultValues = typeof defaultValues;
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<DefaultValues> = ({
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
      // messageBar.showError(error.data.message);
    }
  }, [status]);

  return (
    <MuiContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <MuiGrid container margin={4} rowSpacing={2}>
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
            rules={{ required: true }}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="email"
            title="Email"
            control={control}
            formState={formState}
            type="email"
            rules={{ required: true }}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="password"
            title="Password"
            control={control}
            formState={formState}
            type="password"
            rules={{ required: true, minLength: 8 }}
          />
        </MuiGrid>
        <MuiGrid item xs={12}></MuiGrid>
        <MuiGrid item xs={12}>
          <PrimaryButton type="submit" label="Sign up for free" />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
