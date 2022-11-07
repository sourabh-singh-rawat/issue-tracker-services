import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiTypography from "@mui/material/Typography";
import TooltipWrapper from "../../../../../common/TooltipWrapper/TooltipWrapper";

const SidebarListItem = ({ open, text, icon, to }) => {
  const theme = useTheme();

  const listItemTypographyStyles = {
    color: theme.palette.text.primary,
    opacity: open ? 1 : 0,
    fontWeight: 500,
  };

  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : "auto",
    color: theme.palette.text.primary,
  };

  const listItemButtonStyles = {
    px: (open && 2.5) || (!open && 2.5),
    height: "40px",
  };

  const listLinkStyles = {
    color: theme.palette.text.primary,
    textDecoration: "none",
  };

  return (
    <MuiListItem disablePadding sx={{ display: "block" }}>
      <Link to={to} style={listLinkStyles}>
        {open ? (
          <MuiListItemButton sx={listItemButtonStyles} disableRipple>
            <MuiListItemIcon sx={listItemIconStyles}>{icon}</MuiListItemIcon>
            <MuiTypography variant="body2" sx={listItemTypographyStyles}>
              {text}
            </MuiTypography>
          </MuiListItemButton>
        ) : (
          <TooltipWrapper title={text} placement={"left"}>
            <MuiListItemButton sx={listItemButtonStyles} disableRipple>
              <MuiListItemIcon sx={listItemIconStyles}>{icon}</MuiListItemIcon>
              <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                {text}
              </MuiTypography>
            </MuiListItemButton>
          </TooltipWrapper>
        )}
      </Link>
    </MuiListItem>
  );
};

export default SidebarListItem;
