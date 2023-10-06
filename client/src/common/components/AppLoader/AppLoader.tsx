import React from "react";
import MuiBox from "@mui/material/Box";
import MuiCircularProgress from "@mui/material/CircularProgress";

interface AppLoaderProps {
  size?: string;
}

export default function AppLoader({ size }: AppLoaderProps) {
  return (
    <MuiBox
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiCircularProgress size={size} />
    </MuiBox>
  );
}
