import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase.utils";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  Toolbar,
  ListItem,
  Container,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import {
  Menu,
  Close,
  GridView,
  ErrorOutline,
  PeopleOutline,
  LoginOutlined,
  SettingsOutlined,
  EmojiPeopleOutlined,
  AssignmentOutlined,
} from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import StyledSnackbar from "../StyledSnackBar/StyledSnackBar";

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
  const [open, setOpen] = useState(false);
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
      {/* drawer */}
      <Navbar />
      <Drawer variant="permanent" open={open}>
        <List>
          <Toolbar />
          {/* dashboard button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <GridView />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
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
                  <AssignmentOutlined />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
                  Projects
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* people button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/people" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <EmojiPeopleOutlined />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
                  People
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* teams button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link to="/teams" style={listLinkStyles}>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={listItemIconStyles}>
                  <PeopleOutline />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
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
                  <ErrorOutline />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
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
                  <LoginOutlined />
                </ListItemIcon>
                <Typography variant="body1" sx={listItemTypographyStyles}>
                  Sign Up
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          {/* settings button */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={listItemButtonStyles} onClick={signOutUser}>
              <ListItemIcon sx={listItemIconStyles}>
                <SettingsOutlined />
              </ListItemIcon>
              <Typography variant="body1" sx={listItemTypographyStyles}>
                Settings
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
        <Toolbar>
          {/* hamburger */}
          <IconButton
            color="inherit"
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
            <Close />
          </IconButton>
        </Toolbar>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Toolbar />
          <Outlet />
        </Container>
      </Box>

      <StyledSnackbar />
    </>
  );
};

export default Sidebar;
