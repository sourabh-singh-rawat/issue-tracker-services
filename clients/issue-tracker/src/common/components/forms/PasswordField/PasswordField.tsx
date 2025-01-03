import MuiVisibility from "@mui/icons-material/Visibility";
import MuiVisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiIconButton from "@mui/material/IconButton";
import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { TextField } from "../TextField";

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  title: string;
  form: UseFormReturn<T>;
}

export const PasswordField = <T extends FieldValues>({
  name,
  title,
  form,
}: PasswordFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <TextField
      name={name}
      title={title}
      form={form}
      type={isVisible ? "text" : "password"}
      helperText="Minimum 8 characters with uppercase, lowercase, one digit, no whitespace and atleast one special character (@#$%^&+=!)"
      endAdornment={
        <MuiIconButton onClick={toggle}>
          {isVisible ? <MuiVisibilityOff /> : <MuiVisibility />}
        </MuiIconButton>
      }
    />
  );
};
