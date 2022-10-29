import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { styled, useTheme } from "@mui/material/styles";
import MuiMenu from "@mui/material/Menu";
import MuiGrid from "@mui/material/Grid";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Toolbar";
import MuiIconButton from "@mui/material/IconButton";

import MuiAvatar from "@mui/material/Avatar";
import MuiLogoutIcon from "@mui/icons-material/Logout";
import MuiNotifications from "@mui/icons-material/Notifications";
import MuiAccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

import { signOutUser } from "../../../../../utils/firebase.utils";

const AppBar = styled(MuiAppBar)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    width: "100%",
    boxShadow: 1,
    zIndex: (theme) => theme.zIndex.drawer + 1,
  };
});

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((store) => store.auth);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ boxShadow: "none" }}>
      <MuiToolbar
        variant="dense"
        sx={{ backgroundColor: theme.palette.grey[900], boxShadow: 1 }}
      >
        <MuiGrid container sx={{ alignItems: "center" }}>
          <MuiGrid item flexGrow={1}></MuiGrid>
          <MuiGrid item>
            <MuiIconButton color="inherit">
              <MuiNotifications />
            </MuiIconButton>
          </MuiGrid>
          <MuiGrid item>
            <MuiIconButton onClick={handleMenu} color="inherit">
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
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MuiMenuItem onClick={handleClose}>
                <MuiAccountBoxOutlinedIcon sx={{ fontSize: "18px" }} />
                <MuiTypography variant="body2">My Account</MuiTypography>
              </MuiMenuItem>
              <MuiMenuItem
                onClick={async () => {
                  handleClose();
                  await signOutUser();
                  navigate("/login");
                }}
              >
                <MuiLogoutIcon sx={{ fontSize: "18px" }} />
                <MuiTypography variant="body2">Sign Out</MuiTypography>
              </MuiMenuItem>
            </MuiMenu>
          </MuiGrid>
        </MuiGrid>
      </MuiToolbar>
    </AppBar>
  );
};

export default Navbar;
