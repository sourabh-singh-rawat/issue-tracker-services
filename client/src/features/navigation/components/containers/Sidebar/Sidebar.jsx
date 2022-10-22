import { useState } from "react";
import { styled } from "@mui/material/styles";

import MuiList from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";

import MuiGridViewIcon from "@mui/icons-material/GridView";
import MuiHandshakeIcon from "@mui/icons-material/HandshakeOutlined";
import MuiGroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiBugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import MuiAssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import SidebarListItem from "../SidebarListItem";

export const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
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
          open={open}
          to="/"
          text="Dashboard"
          icon={<MuiGridViewIcon sx={iconStyles} />}
        />
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
            <SidebarListItem
              key={text}
              open={open}
              text={text}
              {...otherProps}
            />
          );
        })}
      </MuiList>
    </Drawer>
  );
};

export default Sidebar;
