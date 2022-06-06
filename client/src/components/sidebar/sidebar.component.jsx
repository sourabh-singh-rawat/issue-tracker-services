import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  Menu,
  X,
  Home,
  Users,
  AlertTriangle,
  LogIn,
  Folder,
} from "react-feather";
import StyledSnackbar from "../styled-snackbar/styled-snackbar.component";

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
  const listItemStyles = { display: "block" };
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
        {/* drawer */}
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "background.main",
            },
          }}
        >
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
              <Menu />
            </IconButton>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ opacity: open ? 1 : 0 }} // important fix for chevronLeft icon
            >
              <X />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {/* dashboard button */}
            <ListItem disablePadding sx={listItemStyles}>
              <Link to="/">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* projects button */}
            <ListItem disablePadding sx={listItemStyles}>
              <Link to="/projects">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary="Projects" sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* teams button */}
            <ListItem disablePadding sx={listItemStyles}>
              <Link to="/teams">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Users />
                  </ListItemIcon>
                  <ListItemText primary="Teams" sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* issues button */}
            <ListItem disablePadding sx={listItemStyles}>
              <Link to="/issues">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <AlertTriangle />
                  </ListItemIcon>
                  <ListItemText primary="Issues" sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* signup button */}
            <ListItem disablePadding sx={listItemStyles}>
              <Link to="/signup">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <LogIn />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <StyledSnackbar />
    </>
  );
};

export default Sidebar;
