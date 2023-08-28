import React from "react";
import { styled } from "@mui/material/styles";

import MuiTextField from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField)(({ theme, error }) => {
  const palette = theme.palette;
  const grey = palette.grey;
  const primary = palette.primary;
  const errorColor = palette.error;

  return {
    "& .MuiOutlinedInput-root ": {
      borderRadius: theme.shape.borderRadiusMedium,
      "& fieldset": {
        color: primary.main,
        border: error
          ? `2px solid ${errorColor.light}`
          : `1px solid ${grey[500]}`,
      },
      "&:hover fieldset": { border: `2px solid ${grey[600]}` },
      "&.Mui-focused": {
        "& fieldset": { border: `2px solid ${primary.main}` },
      },
      "&.Mui-disabled": {
        backgroundColor: grey[200],
        "& fieldset": { border: `1px solid ${grey[300]}` },
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
  rows?: number;
  isInvalid: boolean;
  isDisabled?: boolean;
  isMultiline?: boolean;
}

export default function Field({
  type,
  id,
  name,
  value,
  onBlur,
  onChange,
  rows,
  isInvalid,
  isDisabled,
  isMultiline,
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
      // helperText={helperText}
      rows={rows}
      // placeholder={placeholder}
      fullWidth
      onBlur={onBlur}
      onChange={onChange}
      error={isInvalid}
      multiline={isMultiline}
      disabled={isDisabled}
    />
  );
}
