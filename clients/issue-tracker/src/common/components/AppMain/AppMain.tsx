import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiToolbar from "@mui/material/Toolbar";
import MuiContainer from "@mui/material/Container";

import Navbar from "../navigation/Navbar";
import MenuSidebar from "../navigation/Sidebar";
import { useLargeScreen } from "../../hooks/useLargeScreen";

export default function AppMain() {
  const theme = useTheme();
  const isLargeScreen = useLargeScreen();

  return (
    <MuiBox display="flex" height="100vh">
      <Navbar />
      <MenuSidebar />
      <MuiContainer
        sx={{
          padding: theme.spacing(2),
          width: `calc(100% - ${
            isLargeScreen ? theme.spacing(28) : theme.spacing(9)
          })`,
          overflowX: "auto",
        }}
        disableGutters
      >
        <MuiToolbar variant="dense" disableGutters />
        <MuiGrid container>
          <Outlet />
        </MuiGrid>
      </MuiContainer>
    </MuiBox>
  );
}
