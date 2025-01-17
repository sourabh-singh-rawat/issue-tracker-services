import { alpha, styled, useTheme } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import MuiTypography from "@mui/material/Typography";

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadiusMedium,
  fontWeight: theme.typography.fontWeightBold,
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

export interface SelectProps<Value = unknown> {
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<Value>) => void;
  variant?: "small" | "medium";
  options?: { id: string; name: string }[];
  isDisabled?: boolean;
}

export default function Select({
  value = "",
  name,
  options = [],
  variant,
  onChange,
  isDisabled,
}: SelectProps) {
  const theme = useTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        marginTop: theme.spacing(1),
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadiusMedium,
        backgroundColor: theme.palette.background.default,
      },
    },
  };

  return (
    <StyledSelect
      id={name}
      name={name}
      size="small"
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      IconComponent={KeyboardArrowDownIcon}
      sx={{
        height: variant === "small" ? theme.spacing(4) : "auto",
        "& fieldset": {},
      }}
      disabled={isDisabled}
    >
      {options.map(({ id, name }) => (
        <MenuItem key={id} value={id} disableRipple>
          <MuiTypography variant="body2">{name}</MuiTypography>
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
