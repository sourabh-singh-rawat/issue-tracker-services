import React from "react";
import { useTheme } from "@mui/material";

import MuiTypography from "@mui/material/Typography";
import StyledListItemButton from "../styled/StyledListItemButton";
import StyledListItemIcon from "../styled/StyledListItemIcon";

interface MenuItemContentProps {
  avatarIcon?: JSX.Element;
  label?: string;
  indicatorIcon?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MenuItemContent({
  avatarIcon,
  label,
  indicatorIcon,
  onClick,
}: MenuItemContentProps) {
  const theme = useTheme();

  return (
    <StyledListItemButton onClick={onClick} disableRipple>
      <StyledListItemIcon>{avatarIcon}</StyledListItemIcon>
      {label && (
        <MuiTypography
          sx={{
            ml: 1,
            flexGrow: 1,
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          {label}
        </MuiTypography>
      )}
      <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
    </StyledListItemButton>
  );
}
