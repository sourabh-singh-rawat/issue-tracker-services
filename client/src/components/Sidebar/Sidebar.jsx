import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { signOutUser } from "../../auth/auth";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  Divider,
  Toolbar,
  IconButton,
  ListItem,
  ListItemIcon,
  Container,
  ListItemButton,
  CssBaseline,
  Typography,
} from "@mui/material";
import {
  Menu,
  X,
  Grid,
  Users,
  AlertTriangle,
  FolderPlus,
  LogIn,
  Settings,
} from "react-feather";
import StyledSnackbar from "../StyledSnackBar/StyledSnackBar";
import Navbar from "../Navbar/Navbar";

export const drawerWidth = 240;

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

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // styles
  const listItemTypographyStyles = {
    opacity: open ? 1 : 0,
    color: "text.main",
    fontWeight: "bold",
  };
  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : "auto",
    justifyContent: "center",
  };
  const listItemButtonStyles = {
    height: "40px",
    px: (open && 4) || (!open && 2.5),
  };

  const listLinkStyles = {
    textDecoration: "none",
    color: "text.subtitle1",
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      {/* drawer */}
      <Drawer variant="permanent" open={open}>
        <Toolbar variant="dense" />
        <Divider />
        <List>
          {/* dashboard button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <Grid />
                </ListItemIcon>
                <Typography variant="body2" sx={listItemTypographyStyles}>
                  Dashboard
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* projects button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/projects" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <FolderPlus />
                </ListItemIcon>
                <Typography variant="body2" sx={listItemTypographyStyles}>
                  Projects
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* teams button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/teams" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <Users />
                </ListItemIcon>
                <Typography variant="body2" sx={listItemTypographyStyles}>
                  Teams
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* issues button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/issues" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <AlertTriangle />
                </ListItemIcon>
                <Typography variant="body2" sx={listItemTypographyStyles}>
                  Issues
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* signup button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/signup" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <LogIn />
                </ListItemIcon>
                <Typography variant="body2" sx={listItemTypographyStyles}>
                  Sign Up
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* settings button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={listItemButtonStyles} onClick={signOutUser}>
              <ListItemIcon sx={listItemIconStyles}>
                <Settings />
              </ListItemIcon>
              <Typography variant="body2" sx={listItemTypographyStyles}>
                Settings
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
        <Toolbar>
          {/* hamburger */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
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
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <Toolbar variant="dense" />
        <Container>
          <Outlet />
        </Container>
      </Box>

      <StyledSnackbar />
    </>
  );
};

export default Sidebar;
