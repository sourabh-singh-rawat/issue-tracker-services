import { Outlet, Link } from "react-router-dom";

// MUI Theme
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BugReportIcon from "@mui/icons-material/BugReport";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";

export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // styles
  const listItemTextStyles = { opacity: open ? 1 : 0 };
  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : "auto",
    justifyContent: "center",
  };
  const listItemButtonStyles = {
    minHeight: 48,
    px: (open && 4) || (!open && 2.5),
  };

  return (
    <>
      <Box sx={{ diplay: "flex" }}>
        <CssBaseline />
        {/* drawer */}
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            {/* hamburger */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ opacity: open ? 1 : 0 }} // important fix for chevronLeft icon
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {/* dashboard button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* projects button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/projects">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Projects"
                    sx={listItemTextStyles}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* teams button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/teams">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Teams"
                    sx={listItemTextStyles}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* issues button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/issues">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <BugReportIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Issues"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* signup button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/signup">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sign Up"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Sidebar;
