import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiBugReportIcon from "@mui/icons-material/BugReport";

import NavbarGroup from "../NavbarGroup";
import AccountSwitcher from "../../../../features/auth/components/AccountSwitcher";
import WorkspaceSwitcher from "../../../../features/workspace/components/WorkspaceSwitcher";
import Notifications from "../../../../features/notifications/components/Notification/Notifications";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: "100%",
  zIndex: theme.zIndex.drawer + 1,
}));

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="fixed" sx={{ boxShadow: theme.shadows[1] }}>
      <MuiToolbar
        sx={{ backgroundColor: theme.palette.text.primary }}
        variant="dense"
        disableGutters
      >
        <MuiGrid
          alignItems="center"
          sx={{
            display: "flex",
            px: theme.spacing(2),
          }}
          columnGap={2}
          container
        >
          <NavbarGroup>
            <Link to="/">
              <MuiGrid item>
                <MuiGrid
                  container
                  sx={{
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                  }}
                >
                  <MuiBugReportIcon
                    sx={{ color: theme.palette.primary.main }}
                  />
                </MuiGrid>
              </MuiGrid>
            </Link>
            <MuiGrid item>
              <WorkspaceSwitcher />
            </MuiGrid>
          </NavbarGroup>

          <NavbarGroup>
            <MuiGrid item flexGrow={1}></MuiGrid>
          </NavbarGroup>

          {/* <NavbarGroup>
            <MuiGrid item flexGrow={1}>
              <NavbarTextItemGroup
                items={[
                  { label: "Projects", to: "/projects" },
                  { label: "Issues", to: "/issues" },
                  { label: "Tasks", to: "/tasks" },
                ]}
              />
            </MuiGrid>
          </NavbarGroup> */}

          <NavbarGroup>
            <MuiGrid item>
              <Notifications />
            </MuiGrid>
          </NavbarGroup>

          <NavbarGroup>
            <MuiGrid item>
              <AccountSwitcher />
            </MuiGrid>
          </NavbarGroup>
        </MuiGrid>
      </MuiToolbar>
    </AppBar>
  );
}

export default Navbar;
