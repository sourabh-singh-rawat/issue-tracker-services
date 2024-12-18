import { Box, Grid2, styled, Toolbar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import MuiBugReportIcon from "@mui/icons-material/BugReport";
import MuiAppBar from "@mui/material/AppBar";

import { AccountSwitcher } from "../../../../features/auth/components/AccountSwitcher";
import Notifications from "../../../../features/notifications/components/Notification/Notifications";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="fixed" sx={{ boxShadow: theme.shadows[0] }}>
      <Toolbar
        sx={{
          px: theme.spacing(2.5),
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        }}
        variant="dense"
        disableGutters
      >
        <Box sx={{ width: "100%" }}>
          <Grid2 container sx={{ alignItems: "center" }}>
            <Grid2 size="grow">
              <Link to="/">
                <MuiBugReportIcon sx={{ color: theme.palette.primary.main }} />
              </Link>
            </Grid2>
            <Grid2>
              <Notifications />
            </Grid2>
            <Grid2>
              <AccountSwitcher />
            </Grid2>
          </Grid2>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
