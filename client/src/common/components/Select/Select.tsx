/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { styled } from "@mui/material/styles";

import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiSelect from "@mui/material/Select";
import MuiTypography from "@mui/material/Typography";
import SelectItem from "../MenuItem";

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "capitalize",
    borderRadius: "6px",
    backgroundColor: theme.palette.grey[100],
    "& fieldset": {
      border: `1px solid ${theme.palette.grey[200]}`,
    },
    "&:hover fieldset": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: "transparent",
      transitionDuration: "250ms",
    },
  },
}));

interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  selectedOption: { label: string; value: string } | undefined | null;
  helperText: string;
  onClick: () => void;
  handleChange: () => void;
}

export default function Select({
  label,
  options,
  helperText,
  selectedOption,
  onClick,
  handleChange,
}: SelectProps) {
  return (
    <>
      {label && (
        <MuiTypography
          fontWeight={600}
          sx={{ paddingBottom: 1 }}
          variant="body2"
        >
          {label}
        </MuiTypography>
      )}
      <MuiFormControl fullWidth>
        <StyledSelect
          size="small"
          value={selectedOption}
          sx={{ color: "text.primary", fontSize: "14px", fontWeight: 600 }}
          onChange={handleChange}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              option={option}
              onClick={onClick}
              selectedOption={selectedOption}
            />
          ))}
        </StyledSelect>
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography component="span" variant="body2">
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </>
  );
}
