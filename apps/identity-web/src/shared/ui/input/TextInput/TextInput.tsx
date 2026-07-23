import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { useFormFieldOptional } from "../../forms/useFormField";

export type TextInputProps = TextFieldProps;

export const TextInput = ({
  fullWidth = true,
  size = "small",
  type = "text",
  ...props
}: TextInputProps) => {
  const field = useFormFieldOptional<string>();

  const boundProps: Partial<TextFieldProps> = field
    ? {
        id: field.id,
        name: field.name,
        value: field.value ?? "",
        onChange: (event) => {
          field.onChange(event.target.value);
        },
        onBlur: field.onBlur,
        error: Boolean(field.error),
        helperText: field.error,
        disabled: field.disabled,
      }
    : {};

  return (
    <TextField
      type={type}
      fullWidth={fullWidth}
      size={size}
      {...boundProps}
      {...props}
      onChange={(event) => {
        boundProps.onChange?.(event);
        props.onChange?.(event);
      }}
      onBlur={(event) => {
        boundProps.onBlur?.(event);
        props.onBlur?.(event);
      }}
    />
  );
};
