import { Box, Grid2 } from "@mui/material";
import React from "react";

import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Grid2 size={12}>
      <Outlet />
    </Grid2>
  );
}
