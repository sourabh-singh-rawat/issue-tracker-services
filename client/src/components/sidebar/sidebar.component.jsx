import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, Divider, SwipeableDrawer } from "@mui/material";
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

const drawerWidth = 240;
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)})`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // styles
  const listItemIconStyles = {
    minWidth: 0,
    mr: "auto",
    justifyContent: "center",
  };
  const listItemButtonStyles = {
    minHeight: 48,
  };

  return (
    <>
      <Box sx={{ diplay: "flex" }}>
        {/* drawer */}
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              backgroundColor: "background.main",
            },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {/* dashboard button */}
            <ListItem disablePadding>
              <Link to="/">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Home />
                  </ListItemIcon>
                  {/* <ListItemText primary="Dashboard" /> */}
                </ListItemButton>
              </Link>
            </ListItem>
            {/* projects button */}
            <ListItem disablePadding>
              <Link to="/projects/all">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Folder />
                  </ListItemIcon>
                  {/* <ListItemText primary="Projects" /> */}
                </ListItemButton>
              </Link>
            </ListItem>
            {/* teams button */}
            <ListItem disablePadding>
              <Link to="/teams">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Users />
                  </ListItemIcon>
                  {/* <ListItemText primary="Teams" /> */}
                </ListItemButton>
              </Link>
            </ListItem>
            {/* issues button */}
            <ListItem disablePadding>
              <Link to="/issues?tabs=all">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <AlertTriangle />
                  </ListItemIcon>
                  {/* <ListItemText primary="Issues" /> */}
                </ListItemButton>
              </Link>
            </ListItem>
            {/* signup button */}
            <ListItem disablePadding>
              <Link to="/signup">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <LogIn />
                  </ListItemIcon>
                  {/* <ListItemText primary="Sign Up" /> */}
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "background.main",
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <X />
            </IconButton>
          </Toolbar>
          <List>
            {/* dashboard button */}
            <Link to="/" onClick={toggleDrawer} sx={{ width: "100%" }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* projects button */}
            <Link
              to="/projects/all"
              onClick={toggleDrawer}
              sx={{ width: "100%" }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* teams button */}
            <Link to="/teams">
              <ListItem
                disablePadding
                onClick={toggleDrawer}
                sx={{ width: "100%" }}
              >
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Users />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* issues button */}
            <Link to="/issues?tabs=all">
              <ListItem
                disablePadding
                onClick={toggleDrawer}
                sx={{ width: "100%" }}
              >
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <AlertTriangle />
                  </ListItemIcon>
                  <ListItemText primary="Issues" />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* signup button */}
            <Link to="/signup">
              <ListItem
                disablePadding
                onClick={toggleDrawer}
                sx={{ width: "100%" }}
              >
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <LogIn />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </SwipeableDrawer>
      <StyledSnackbar />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Sidebar;
