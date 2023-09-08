import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiTypography from "@mui/material/Typography";

const StyledListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  backgroundColor: "transparent",
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    padding: theme.spacing(1),
  },
  "&.MuiListItemButton-root:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    transition: theme.transitions.create(["color"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const StyledListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(0),
  alignItems: "center",
  color: "inherit",
  width: theme.spacing(2.5),
}));

interface SidebarItemProps {
  isSidebarOpen: boolean;
  text: string;
  href: string;
  icon?: JSX.Element;
  onClick?: () => void;
  indicatorIcon?: JSX.Element;
  isChild?: boolean;
}

export default function SidebarItem({
  isSidebarOpen,
  text,
  icon,
  href,
  onClick,
  indicatorIcon,
  isChild,
}: SidebarItemProps) {
  const theme = useTheme();

  return (
    <Link style={{ color: "inherit", textDecoration: "none" }} to={href}>
      <StyledListItemButton onClick={onClick} disableRipple>
        <StyledListItemIcon>{icon}</StyledListItemIcon>
        <MuiTypography
          sx={{
            backgroundColor: "transparent",
            ml: 1,
            flexGrow: 1,
            opacity: isSidebarOpen ? 1 : 0,
            fontWeight: theme.typography.fontWeightMedium,
            transition: theme.transitions.create(["opacity"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
          variant={isChild ? "body2" : "body1"}
        >
          {text}
        </MuiTypography>
        <StyledListItemIcon>{indicatorIcon}</StyledListItemIcon>
      </StyledListItemButton>
    </Link>
  );
}
