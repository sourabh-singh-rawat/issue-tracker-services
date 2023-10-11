import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiToolbar from "@mui/material/Toolbar";
import MuiContainer from "@mui/material/Container";

import Navbar from "../navigation/Navbar";
import MenuSidebar from "../navigation/Sidebar";

export default function AppMain() {
  const theme = useTheme();

  return (
    <MuiBox display="flex">
      <Navbar />
      <MenuSidebar />
      <MuiContainer sx={{ padding: theme.spacing(2) }} disableGutters>
        <MuiToolbar variant="dense" />
        <MuiGrid container>
          <Outlet />
        </MuiGrid>
      </MuiContainer>
    </MuiBox>
  );
}
