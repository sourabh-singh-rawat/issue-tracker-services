import React from "react";

import MuiTypography from "@mui/material/Typography";
import StyledListItemIcon from "../styled/StyledListItemIcon";
import StyledListItemButton from "../styled/StyledListItemButton";

interface MenuItemContentProps {
  avatarIcon?: JSX.Element;
  label?: string;
  indicatorIcon?: JSX.Element | null;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MenuItemContent({
  avatarIcon,
  label,
  indicatorIcon,
  onClick,
}: MenuItemContentProps) {
  return (
    <StyledListItemButton onClick={onClick} disableRipple>
      <StyledListItemIcon>{avatarIcon}</StyledListItemIcon>
      {label && (
        <MuiTypography
          sx={{
            ml: 1,
            flexGrow: 1,
            opacity: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </MuiTypography>
      )}
      <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
    </StyledListItemButton>
  );
}
