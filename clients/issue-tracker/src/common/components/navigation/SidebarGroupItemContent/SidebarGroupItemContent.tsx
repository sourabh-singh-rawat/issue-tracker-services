import React from "react";
import { useTheme } from "@mui/material/styles";

import MuiTypography from "@mui/material/Typography";
import StyledListItemIcon from "../../styled/StyledListItemIcon";
import StyledListItemButton from "../../styled/StyledListItemButton";

export interface Props {
  title?: string;
  icon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  indicatorIcon?: JSX.Element;
  isChild?: boolean;
  isVisible?: boolean;
}

export default function SidebarGroupItemContent({
  title,
  icon,
  onClick,
  indicatorIcon,
  isChild,
  isVisible,
}: Props) {
  const theme = useTheme();

  return (
    <StyledListItemButton onClick={onClick} disableRipple>
      <StyledListItemIcon>{icon}</StyledListItemIcon>
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
        variant={isChild ? "body2" : "body2"}
        noWrap
      >
        {title}
      </MuiTypography>
      <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
    </StyledListItemButton>
  );
}
