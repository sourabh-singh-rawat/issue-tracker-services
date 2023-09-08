import React from "react";
import { Outlet } from "react-router-dom";
import MuiContainer from "@mui/material/Container";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiToolbar from "@mui/material/Toolbar";
import Navbar from "../navigation/Navbar";
import MenuSidebar from "../navigation/Sidebar";

export default function AppMain() {
  return (
    <MuiBox display="flex">
      <Navbar />
      <MenuSidebar />
      <MuiContainer>
        <MuiToolbar variant="dense" />
        <MuiGrid container paddingTop={2}>
          <Outlet />
        </MuiGrid>
      </MuiContainer>
    </MuiBox>
  );
}
