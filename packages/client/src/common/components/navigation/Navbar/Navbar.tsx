import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

import MuiGrid from "@mui/material/Grid";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiBugReportIcon from "@mui/icons-material/BugReport";

import AccountSwitcher from "../../../../features/auth/components/AccountSwitcher";
import Notifications from "../../../../features/notifications/components/Notification/Notifications";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="fixed" sx={{ boxShadow: theme.shadows[0] }}>
      <MuiToolbar
        sx={{
          px: theme.spacing(2.5),
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        }}
        variant="dense"
        disableGutters
      >
        <MuiGrid
          alignItems="center"
          sx={{ display: "flex" }}
          spacing={1}
          container
        >
          <MuiGrid item>
            <Link to="/">
              <MuiBugReportIcon sx={{ color: theme.palette.primary.main }} />
            </Link>
          </MuiGrid>

          <MuiGrid item flexGrow={1}></MuiGrid>

          <MuiGrid item>
            <Notifications />
          </MuiGrid>

          <MuiGrid item>
            <AccountSwitcher />
          </MuiGrid>
        </MuiGrid>
      </MuiToolbar>
    </AppBar>
  );
}
