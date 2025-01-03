import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Grid2, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Link } from "../../base";
import { TextField } from "../TextField";

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: React.ReactElement | string;
  form: UseFormReturn<T>;
  showForgotPasswordLink?: boolean;
}

/**
 * The Password Field
 * @param props.name - Name of the field
 * @param props.title - Title/Label of the field
 * @param props.form - Form to use
 * @param props.placeholder - Optional Placeholder for the field
 * @param props.showForgotPasswordLink - Show forgot password link or not
 * @returns
 */
export const PasswordField = <T extends FieldValues>({
  name,
  label,
  form,
  showForgotPasswordLink,
}: PasswordFieldProps<T>) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const handleVisibility = () => setIsVisible(!isVisible);

  return (
    <Grid2 container>
      <Grid2 size={12}>
        <TextField
          form={form}
          name={name}
          label={label}
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          endAdornment={
            <IconButton size="small" onClick={handleVisibility} disableRipple>
              {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          }
        />
      </Grid2>
      <Grid2 size={1} flexGrow={1}></Grid2>
      {showForgotPasswordLink && (
        <Grid2>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Grid2>
      )}
    </Grid2>
  );
};
