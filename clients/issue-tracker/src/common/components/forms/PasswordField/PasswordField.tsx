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
  placeholder?: string;
}

/**
 * The Password Field
 * @param params.name - Name of the field
 * @param params.title - Title/Label of the field
 * @param params.form - Form to use
 * @param params.placeholder - Optional Placeholder for the field
 * @returns
 */
export const PasswordField = <T extends FieldValues>({
  name,
  title,
  form,
  placeholder,
}: PasswordFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <TextField
      name={name}
      title={title}
      form={form}
      type={isVisible ? "text" : "password"}
      placeholder={placeholder}
      helperText="Minimum 8 characters with uppercase, lowercase, one digit, no whitespace and atleast one special character (@#$%^&+=!)"
      endAdornment={
        <MuiIconButton onClick={toggle}>
          {isVisible ? <MuiVisibilityOff /> : <MuiVisibility />}
        </MuiIconButton>
      }
    />
  );
};
