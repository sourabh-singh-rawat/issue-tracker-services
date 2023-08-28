import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import MuiAccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MuiBugReportIcon from "@mui/icons-material/BugReport";
import MuiLogoutIcon from "@mui/icons-material/Logout";

import MuiAppBar from "@mui/material/AppBar";
import MuiAvatar from "@mui/material/Avatar";
import MuiGrid from "@mui/material/Grid";
import MuiIconButton from "@mui/material/IconButton";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiNotifications from "@mui/icons-material/Notifications";
import MuiToolbar from "@mui/material/Toolbar";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import theme from "../../app/theme.config";

import { logout } from "../../utils/firebase/logout.util";

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  paddingLeft: "12px",
  paddingRight: "12px",
  transition: "all 350ms",
  "&.MuiMenuItem-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    margin: "0 4px",
    "&:hover": {
      backgroundColor: theme.palette.grey[1200],
    },
  },
  "&.Mui-selected": {
    color: theme.palette.primary[800],
  },
}));

const AppBar = styled(MuiAppBar)(() => ({
  width: "100%",
  zIndex: () => theme.zIndex.drawer + 1,
}));

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((store) => store.auth);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ boxShadow: theme.shadows[2] }}>
      <MuiToolbar
        sx={{ backgroundColor: theme.palette.background.navbar }}
        variant="dense"
      >
        <MuiGrid alignItems="center" columnSpacing={2.5} container>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: "none",
              }}
              to="/"
            >
              <MuiTypography
                sx={{
                  color: theme.palette.primary[800],
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  transitionDuration: "0.3s",
                  fontSize: "15px",
                }}
                variant="body2"
              >
                <MuiBugReportIcon />
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: "none",
              }}
              to="/projects"
            >
              <MuiTypography
                sx={{
                  fontWeight: 600,
                  transitionDuration: "0.3s",
                  "&:hover": { color: theme.palette.primary[800] },
                }}
                variant="body2"
              >
                Projects
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: "none",
              }}
              to="/issues"
            >
              <MuiTypography
                sx={{
                  transitionDuration: "0.3s",
                  fontWeight: 600,
                  "&:hover": { color: theme.palette.primary[800] },
                }}
                variant="body2"
              >
                Issues
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: "none",
              }}
              to="/task"
            >
              <MuiTypography
                sx={{
                  fontWeight: 600,
                  transitionDuration: "0.3s",
                  "&:hover": { color: theme.palette.primary[800] },
                }}
                variant="body2"
              >
                Tasks
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid flexGrow={1} item />
          <MuiGrid item>
            <MuiIconButton color="inherit">
              <MuiNotifications />
            </MuiIconButton>
          </MuiGrid>
          <MuiGrid item>
            <MuiIconButton color="inherit" onClick={handleMenu}>
              <MuiAvatar
                src={auth.user.photoURL}
                sx={{ width: "28px", height: "28px" }}
              >
                {auth.user.displayName.match(/\b(\w)/g)[0]}
              </MuiAvatar>
            </MuiIconButton>
            <MuiMenu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={Boolean(anchorEl)}
              PaperProps={{
                style: {
                  marginTop: "6px",
                  boxShadow: theme.shadows[2],
                  borderRadius: theme.shape.borderRadiusMedium,
                  backgroundColor: theme.palette.common.white,
                },
              }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              onClose={handleClose}
            >
              <StyledMenuItem onClick={handleClose}>
                <MuiAccountBoxOutlinedIcon sx={{ fontSize: "18px" }} />
                <MuiTypography sx={{ marginLeft: 1 }} variant="body2">
                  My Account
                </MuiTypography>
              </StyledMenuItem>
              <StyledMenuItem
                onClick={async () => {
                  handleClose();
                  await logout();
                  navigate("/login");
                }}
              >
                <MuiLogoutIcon sx={{ fontSize: "18px" }} />
                <MuiTypography sx={{ marginLeft: 1 }} variant="body2">
                  Sign Out
                </MuiTypography>
              </StyledMenuItem>
            </MuiMenu>
          </MuiGrid>
        </MuiGrid>
      </MuiToolbar>
    </AppBar>
  );
}

export default Navbar;
