import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { useId } from "react";
import { useFormFieldOptional } from "../../forms/useFormField";

const StyledTextField = styled(TextField)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const borderDefault = isDark ? theme.palette.grey[600] : theme.palette.divider;
  const borderHover = isDark ? theme.palette.grey[700] : theme.palette.grey[500];
  const borderFocus = theme.palette.text.primary;
  const surface = theme.palette.background.paper;

  const focusRingRest = `0 0 0 3px ${alpha(theme.palette.text.primary, 0)}`;
  const focusRing = `0 0 0 3px ${alpha(theme.palette.text.primary, isDark ? 0.16 : 0.12)}`;
  const focusRingError = `0 0 0 3px ${alpha(theme.palette.error.main, 0.2)}`;
  const focusMotion = {
    duration: 320,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: 6,
      position: "relative",
      backgroundColor: surface,
      boxShadow: focusRingRest,
      transition: theme.transitions.create(["box-shadow", "background-color"], focusMotion),
      "& fieldset": {
        borderWidth: 2,
        borderColor: borderDefault,
        transition: theme.transitions.create(["border-color"], focusMotion),
      },
      "&:hover fieldset": {
        borderWidth: 2,
        borderColor: borderHover,
      },
      "&.Mui-focused": {
        backgroundColor: surface,
        boxShadow: focusRing,
        "& fieldset": {
          borderWidth: 2,
          borderColor: borderFocus,
        },
        "&.Mui-error": {
          boxShadow: focusRingError,
          "& fieldset": {
            borderColor: theme.palette.error.main,
          },
        },
      },
      "&.Mui-error fieldset": {
        borderWidth: 2,
        borderColor: theme.palette.error.main,
      },
      "&.Mui-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
        boxShadow: focusRingRest,
        "& fieldset": {
          borderColor: theme.palette.action.disabled,
        },
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
      "&.MuiInputBase-inputSizeSmall": {
        padding: "10px 14px",
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(0.75),
      fontSize: "14px",
    },
  };
});

export type TextInputProps = TextFieldProps;

export const TextInput = ({
  fullWidth = true,
  size = "small",
  type = "text",
  label,
  id,
  ...props
}: TextInputProps) => {
  const field = useFormFieldOptional<string>();
  const generatedId = useId();

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

  const resolvedId = id ?? boundProps.id ?? props.name ?? generatedId;
  const resolvedError = props.error ?? boundProps.error;
  const resolvedDisabled = props.disabled ?? boundProps.disabled;

  return (
    <Box sx={{ width: fullWidth ? "100%" : undefined }}>
      {label != null && label !== false && (
        <InputLabel
          shrink
          htmlFor={resolvedId}
          error={Boolean(resolvedError)}
          disabled={resolvedDisabled}
          sx={(theme) => ({
            position: "static",
            transform: "none",
            transformOrigin: "top left",
            maxWidth: "100%",
            pointerEvents: "auto",
            overflow: "visible",
            whiteSpace: "normal",
            mb: 0.75,
            color: theme.palette.text.primary,
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1.4,
            "&.Mui-focused": {
              color: theme.palette.text.primary,
            },
            "&.Mui-error": {
              color: theme.palette.error.main,
            },
          })}
        >
          {label}
        </InputLabel>
      )}
      <StyledTextField
        type={type}
        fullWidth={fullWidth}
        size={size}
        variant="outlined"
        {...boundProps}
        {...props}
        id={resolvedId}
        label={undefined}
        onChange={(event) => {
          boundProps.onChange?.(event);
          props.onChange?.(event);
        }}
        onBlur={(event) => {
          boundProps.onBlur?.(event);
          props.onBlur?.(event);
        }}
      />
    </Box>
  );
};
