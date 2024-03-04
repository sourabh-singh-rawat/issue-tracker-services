import React, { useState } from "react";
import { Control, FieldValues, FormState, Path } from "react-hook-form";
import MuiIconButton from "@mui/material/IconButton";
import MuiVisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiVisibility from "@mui/icons-material/Visibility";
import TextField from "../TextField";

interface PasswordFieldProps<DefaultValues extends FieldValues> {
  name: Path<DefaultValues>;
  title: string;
  control: Control<DefaultValues>;
  formState: FormState<DefaultValues>;
}

export default function PasswordField<DefaultValues extends FieldValues>({
  name,
  title,
  control,
  formState,
}: PasswordFieldProps<DefaultValues>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <TextField
      name={name}
      title={title}
      control={control}
      formState={formState}
      type={isVisible ? "text" : "password"}
      helperText="Minimum 8 characters with uppercase, lowercase, one digit, no whitespace and atleast one special character (@#$%^&+=!)"
      endAdornment={
        <MuiIconButton onClick={toggle}>
          {isVisible ? <MuiVisibilityOff /> : <MuiVisibility />}
        </MuiIconButton>
      }
    />
  );
}
