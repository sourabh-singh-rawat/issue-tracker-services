import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import MuiTextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, styled, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { HTMLInputTypeAttribute, ReactElement } from "react";
import { themeBorderRadiusMedium } from "../theme/shape";
import { Label } from "./Label";

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "100%",
    position: "relative",
    borderColor: theme.palette.divider,
    borderRadius: themeBorderRadiusMedium(theme),
    backgroundColor: theme.palette.background.default,
    fontSize: "inherit",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&.Mui-focused": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      fieldset: { borderWidth: "2px" },
      "&.Mui-error": {
        boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
        "& fieldset": { borderWidth: "2px" },
      },
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
      "& fieldset": { borderWidth: "2px" },
    },
  },
  ".MuiFormHelperText-root": {
    fontSize: theme.typography.body1.fontSize,
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

function fieldErrorMessage(field: AnyFieldApi): string | undefined {
  const errors = field.state.meta.errors;
  if (!errors?.length) {
    return undefined;
  }

  const first = errors[0];
  if (typeof first === "string") {
    return first;
  }
  if (first && typeof first === "object" && "message" in first) {
    const message = (first as { message?: unknown }).message;
    return typeof message === "string" ? message : undefined;
  }
  return undefined;
}

export interface TextFieldProps {
  field: AnyFieldApi;
  label?: ReactElement | string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  helperText?: string;
  description?: string;
  rows?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  autoFocus?: boolean;
}

export const TextField = ({
  field,
  label,
  placeholder,
  helperText,
  description,
  type = "text",
  rows = 0,
  isLoading,
  isDisabled,
  startAdornment,
  endAdornment,
  onClick,
  sx,
  autoFocus = false,
}: TextFieldProps) => {
  const isMultiline = rows > 0;
  const theme = useTheme();
  const errorMessage = fieldErrorMessage(field);
  const isError = Boolean(errorMessage);
  const resolvedHelperText = errorMessage ?? helperText;

  return (
    <Box>
      {label ? (
        <Box sx={{ pb: theme.spacing(1) }}>
          <Label
            id={field.name}
            title={label}
            isLoading={isLoading}
            color={isError ? theme.palette.error.main : undefined}
          />
        </Box>
      ) : null}
      {isLoading ? (
        <>
          <Skeleton />
          {isMultiline ? <Skeleton /> : null}
          {isMultiline ? <Skeleton /> : null}
          {isMultiline ? <Skeleton width="75%" /> : null}
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <StyledTextField
            type={type}
            id={field.name}
            name={field.name}
            value={(field.state.value as string | number | null | undefined) ?? ""}
            onBlur={field.handleBlur}
            onChange={(event) => {
              field.handleChange(event.target.value);
            }}
            placeholder={placeholder}
            helperText={resolvedHelperText}
            sx={sx}
            size="small"
            rows={rows}
            error={isError}
            onClick={onClick}
            disabled={isDisabled}
            multiline={isMultiline}
            slotProps={{ input: { startAdornment, endAdornment } }}
            fullWidth
            autoFocus={autoFocus}
          />
          {description ? (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          ) : null}
        </Box>
      )}
    </Box>
  );
};
