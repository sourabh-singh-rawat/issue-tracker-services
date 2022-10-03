import { Link } from "react-router-dom";

import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiTypography from "@mui/material/Typography";

export default function SidebarListItem({ open, text, icon, to }) {
  const listItemTypographyStyles = {
    color: "text.main",
    opacity: open ? 1 : 0,
    fontWeight: 600,
  };

  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : "auto",
  };

  const listItemButtonStyles = {
    px: (open && 2.5) || (!open && 2.5),
    height: "40px",
  };

  const listLinkStyles = {
    color: "text.subtitle1",
    textDecoration: "none",
  };

  return (
    <MuiListItem disablePadding sx={{ display: "block" }}>
      <Link to={to} style={listLinkStyles}>
        <MuiListItemButton sx={listItemButtonStyles} disableRipple>
          <MuiListItemIcon sx={listItemIconStyles}>{icon}</MuiListItemIcon>
          <MuiTypography variant="body2" sx={listItemTypographyStyles}>
            {text}
          </MuiTypography>
        </MuiListItemButton>
      </Link>
    </MuiListItem>
  );
}
