import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiMenu from "@mui/material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Toolbar";
import MuiIconButton from "@mui/material/IconButton";

import MuiAvatar from "@mui/material/Avatar";
import MuiLogoutIcon from "@mui/icons-material/Logout";
import MuiAccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MuiNotifications from "@mui/icons-material/Notifications";

import { signOutUser } from "../../utils/firebase.utils";

const appBarStyles = {
  width: "100%",
  color: "white",
  boxShadow: 1,
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export default function Navbar({ onClick, loading }) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((store) => store.auth.user);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <MuiAppBar position="fixed" sx={appBarStyles}>
      <MuiToolbar variant="dense" sx={{ backgroundColor: "secondary.main" }}>
        <MuiGrid container>
          {/* <MuiGrid item sx={{ color: "text.subtitle1" }}>
            <BackButton onClick={onClick} />
          </MuiGrid> */}
          {/* <MuiGrid item sx={{ color: "text.subtitle1" }}>
            <Breadcrumbs items={breadcrumbItems} loading={loading} />
          </MuiGrid> */}
        </MuiGrid>
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
}
