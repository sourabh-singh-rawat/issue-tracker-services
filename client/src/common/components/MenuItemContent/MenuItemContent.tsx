import React from "react";
import { useTheme } from "@mui/material";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

interface MenuItemContentProps {
  label?: string;
  indicatorIcon?: JSX.Element;
  avatarIcon?: JSX.Element;
}

export default function MenuItemContent({
  avatarIcon,
  label,
  indicatorIcon,
}: MenuItemContentProps) {
  const theme = useTheme();

  return (
    <MuiGrid container display="flex" columnSpacing={1} alignItems="center">
      <MuiGrid item color={theme.palette.grey[500]}>
        <MuiGrid container>{avatarIcon}</MuiGrid>
      </MuiGrid>
      <MuiGrid item flexGrow={1}>
        <MuiTypography>{label}</MuiTypography>
      </MuiGrid>
      <MuiGrid item>
        <MuiGrid container>{indicatorIcon}</MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
}
