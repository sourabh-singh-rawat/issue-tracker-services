import React from "react";
import { useTheme } from "@mui/material/styles";

import MuiTypography from "@mui/material/Typography";
import StyledListItemIcon from "../../styled/StyledListItemIcon";
import StyledListItemButton from "../../styled/StyledListItemButton";

export interface SidebarGroupItemContentProps {
  label?: string;
  avatarIcon?: JSX.Element;
  onClick?: () => void;
  indicatorIcon?: JSX.Element;
  isChild?: boolean;
  isVisible?: boolean;
}

export default function SidebarGroupItemContent({
  label,
  avatarIcon,
  onClick,
  indicatorIcon,
  isChild,
  isVisible,
}: SidebarGroupItemContentProps) {
  const theme = useTheme();

  return (
    <StyledListItemButton onClick={onClick} disableRipple>
      <StyledListItemIcon>{avatarIcon}</StyledListItemIcon>
      <MuiTypography
        sx={{
          ml: 1,
          flexGrow: 1,
          opacity: isVisible ? 1 : 0,
          transition: theme.transitions.create(["opacity"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          fontWeight: theme.typography.fontWeightMedium,
          backgroundColor: "transparent",
        }}
        variant={isChild ? "body2" : "body1"}
      >
        {label}
      </MuiTypography>
      <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
    </StyledListItemButton>
  );
}
