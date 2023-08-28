import React from "react";
import { Outlet } from "react-router-dom";

import MuiBox from "@mui/material/Box";

export default function AppLayout() {
  return (
    <MuiBox width="100vw" height="100vh">
      <Outlet />
    </MuiBox>
  );
}
