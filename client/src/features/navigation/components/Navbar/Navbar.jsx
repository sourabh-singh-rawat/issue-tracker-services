import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

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

import { signOutUser } from "../../../../utils/firebase.utils";

const appBarStyles = {
  width: "100%",
  color: "white",
  boxShadow: 1,
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((store) => store.auth.user);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <MuiAppBar position="fixed" sx={appBarStyles}>
      <MuiToolbar variant="dense" sx={{ backgroundColor: "secondary.main" }}>
        <MuiGrid container></MuiGrid>
        <MuiNotifications />
        <MuiTypography variant="body2">
          {auth && (
            <Fragment>
              <MuiIconButton onClick={handleMenu} color="inherit">
                <MuiAvatar
                  src={auth.photoURL}
                  sx={{ width: "28px", height: "28px" }}
                />
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
                  onClick={() => {
                    handleClose();
                    signOutUser();
                  }}
                >
                  <MuiLogoutIcon sx={{ fontSize: "18px" }} />
                  <MuiTypography variant="body2">Sign Out</MuiTypography>
                </MuiMenuItem>
              </MuiMenu>
            </Fragment>
          )}
        </MuiTypography>
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default Navbar;
