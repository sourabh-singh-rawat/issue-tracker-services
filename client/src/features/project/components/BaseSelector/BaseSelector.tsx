import React from "react";
import { alpha, styled, useTheme } from "@mui/material";

import MuiTypography from "@mui/material/Typography";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  width: "100%",
  height: "32px",
  margin: 2,
  borderRadius: theme.shape.borderRadiusMedium,
  "& fieldset": {
    border: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(["border-color"]),
  },
  "&.Mui-focused": {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-error": {
    boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
  },
}));

export interface BaseSelectorProps {
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<unknown>) => void;
  options?: string[];
}

export default function BaseSelector({
  value,
  name,
  options = [],
  onChange,
}: BaseSelectorProps) {
  const theme = useTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        boxShadow: theme.shadows[20],
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadiusMedium,
        backgroundColor: theme.palette.background.default,
      },
    },
  };

  return (
    <StyledSelect
      MenuProps={MenuProps}
      id={name}
      name={name}
      size="small"
      sx={{ display: "flex" }}
      value={value}
      onChange={onChange}
      IconComponent={KeyboardArrowDownIcon}
    >
      {options.map((name) => (
        <MenuItem key={name} value={name} disableRipple>
          <MuiTypography variant="body2">{name}</MuiTypography>
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
