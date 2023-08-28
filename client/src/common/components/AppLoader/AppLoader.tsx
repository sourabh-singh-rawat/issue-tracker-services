import React from "react";
import MuiBox from "@mui/material/Box";
import MuiCircularProgress from "@mui/material/CircularProgress";

export default function AppLoader() {
  return (
    <MuiBox
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiCircularProgress />
    </MuiBox>
  );
}
