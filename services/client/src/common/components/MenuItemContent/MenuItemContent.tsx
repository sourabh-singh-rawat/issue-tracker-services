import React from "react";

import { ListItemText, useTheme } from "@mui/material";
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
  const theme = useTheme();

  return (
    <StyledListItemButton onClick={onClick} disableRipple disableGutters>
      {avatarIcon && (
        <StyledListItemIcon sx={{ marginRight: theme.spacing(1) }}>
          {avatarIcon}
        </StyledListItemIcon>
      )}
      {label && (
        <ListItemText
          primary={label}
          primaryTypographyProps={{ variant: "body2", noWrap: true }}
        />
      )}
      {indicatorIcon && (
        <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
      )}
    </StyledListItemButton>
  );
}
