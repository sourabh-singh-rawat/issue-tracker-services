import { useState } from "react";
import { styled } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";

import MuiGridViewIcon from "@mui/icons-material/GridView";
import MuiHandshakeIcon from "@mui/icons-material/HandshakeOutlined";
import MuiGroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiBugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import MuiAssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import SidebarListItem from "../SidebarListItem";

export const drawerWidth = 240;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const iconStyles = { width: "20px" };

  const openedMixin = () => ({
    width: drawerWidth,
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Drawer variant="permanent" open={open}>
      <MuiList>
        <MuiToolbar variant="dense" />
        <SidebarListItem
          open
          to="/"
          text="Dashboard"
          icon={<MuiGridViewIcon sx={iconStyles} />}
        />
        <MuiListItem disablePadding sx={{ display: "block", paddingLeft: 2.5 }}>
          <MuiTypography
            sx={{ fontSize: "12px", fontWeight: 600, color: "GrayText" }}
          >
            MANAGE
          </MuiTypography>
        </MuiListItem>

        {[
          {
            to: "/projects",
            text: "Projects",
            icon: <MuiAssignmentOutlinedIcon sx={iconStyles} />,
          },
          {
            to: "/issues",
            text: "Issues",
            icon: <MuiBugReportOutlinedIcon sx={iconStyles} />,
          },
          {
            to: "/teams",
            text: "Teams",
            icon: <MuiGroupsOutlinedIcon sx={iconStyles} />,
          },
          {
            to: "/collaborators",
            text: "People",
            icon: <MuiHandshakeIcon sx={iconStyles} />,
          },
          {
            to: "/settings",
            text: "Settings",
            icon: <MuiSettingsOutlinedIcon sx={iconStyles} />,
          },
        ].map(({ text, ...otherProps }) => {
          return (
            <SidebarListItem key={text} open text={text} {...otherProps} />
          );
        })}
      </MuiList>
    </Drawer>
  );
}
