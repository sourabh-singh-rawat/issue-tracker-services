import { Fragment, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

// MUI Core
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemButton from "@mui/material/ListItemButton";

// MUI Icons
import MuiGridViewIcon from "@mui/icons-material/GridView";
import MuiHandshakeIcon from "@mui/icons-material/HandshakeOutlined";
import MuiGroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiBugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import MuiAssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Navbar from "../Navbar/Navbar";
import SnackBar from "../SnackBar/SnackBar";
import {
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from "../../features/issue/issue.api";
import { useDispatch } from "react-redux";
import {
  setIssuePriority,
  setIssueStatus,
} from "../../features/issue/issue.slice";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

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
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    if (issueStatus.data) dispatch(setIssueStatus(issueStatus.data));
  }, [issueStatus.data]);

  useEffect(() => {
    if (issuePriority.data) dispatch(setIssuePriority(issuePriority.data));
  }, [issuePriority.data]);

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

  const iconStyles = { width: "20px" };

  return (
    <Fragment>
      {/* drawer */}
      <Drawer variant="permanent" open={open}>
        <MuiList>
          <MuiToolbar variant="dense" />
          {/* dashboard button */}
          <MuiListItem
            disablePadding
            sx={{ display: "block", marginBottom: "20px" }}
          >
            <Link to="/" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiGridViewIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  Dashboard
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
          <MuiListItem
            disablePadding
            sx={{ display: "block", paddingLeft: 2.5 }}
          >
            <MuiTypography
              sx={{ fontSize: "12px", fontWeight: 600, color: "GrayText" }}
            >
              MANAGE
            </MuiTypography>
          </MuiListItem>
          {/* projects button */}
          <MuiListItem disablePadding sx={{ display: "block" }}>
            <Link to="/projects" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiAssignmentOutlinedIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  Projects
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
          {/* issues button */}
          <MuiListItem disablePadding sx={{ display: "block" }}>
            <Link to="/issues" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiBugReportOutlinedIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  Issues
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
          {/* teams button */}
          <MuiListItem disablePadding sx={{ display: "block" }}>
            <Link to="/teams" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiGroupsOutlinedIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  Teams
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
          {/* people button */}
          <MuiListItem disablePadding sx={{ display: "block" }}>
            <Link to="/collaborators" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiHandshakeIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  People
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
          {/* settings button */}
          <MuiListItem disablePadding sx={{ display: "block" }}>
            <Link to="/settings" style={listLinkStyles}>
              <MuiListItemButton sx={listItemButtonStyles} disableRipple>
                <MuiListItemIcon sx={listItemIconStyles}>
                  <MuiSettingsOutlinedIcon sx={iconStyles} />
                </MuiListItemIcon>
                <MuiTypography variant="body2" sx={listItemTypographyStyles}>
                  Settings
                </MuiTypography>
              </MuiListItemButton>
            </Link>
          </MuiListItem>
        </MuiList>
      </Drawer>
      <MuiBox sx={{ flexGrow: 1 }}>
        <Navbar />
        <Toolbar variant="dense" />
        <MuiContainer sx={{ paddingTop: "20px" }}>
          <Outlet />
        </MuiContainer>
      </MuiBox>
      <SnackBar />
    </Fragment>
  );
};

export default Sidebar;
