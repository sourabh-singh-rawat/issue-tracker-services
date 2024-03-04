import React from "react";
import { styled } from "@mui/material/styles";

import MuiTextField from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField)(({ theme, error }) => {
  const palette = theme.palette;
  const greyColor = palette.grey;
  const primaryColor = palette.primary;
  const errorColor = palette.error;

  return {
    "& .MuiOutlinedInput-root ": {
      borderRadius: theme.shape.borderRadiusMedium,
      "& fieldset": {
        color: primaryColor.main,
        border: error
          ? `2px solid ${errorColor.light}`
          : `1px solid ${greyColor[500]}`,
      },
      "&:hover fieldset": { border: `2px solid ${greyColor[600]}` },
      "&.Mui-focused": {
        "& fieldset": { border: `2px solid ${primaryColor.main}` },
      },
      "&.Mui-disabled": {
        backgroundColor: greyColor[200],
        "& fieldset": { border: `1px solid ${greyColor[300]}` },
      },
    },
    "& .MuiFormHelperText-contained": {
      fontSize: theme.typography.body2,
      marginLeft: 0,
    },
  };
});

interface FieldProps {
  type?: React.HTMLInputTypeAttribute;
  id: string;
  name: string;
  value: string | number;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  endAdornment?: React.JSX.Element;
  startAdornment?: React.JSX.Element;
  isInvalid: boolean;
  isDisabled?: boolean;
  isMultiline?: boolean;
  rows?: number;
}

export default function Field({
  type,
  id,
  name,
  value,
  onBlur,
  onChange,
  helperText,
  endAdornment,
  startAdornment,
  isInvalid,
  isDisabled,
  isMultiline,
  rows,
}: FieldProps) {
  return (
    <StyledTextField
      autoCorrect="off"
      autoComplete="off"
      autoCapitalize="off"
      size="small"
      type={type}
      id={id}
      name={name}
      value={value}
      helperText={helperText}
      // placeholder={placeholder}
      fullWidth
      onBlur={onBlur}
      onChange={onChange}
      error={isInvalid}
      multiline={isMultiline}
      disabled={isDisabled}
      rows={rows}
      InputProps={{ endAdornment, startAdornment }}
    />
  );
}
