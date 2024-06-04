import React from "react";
import { useTheme } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiCircularProgress from "@mui/material/CircularProgress";

interface AppLoaderProps {
  size?: number;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

export default function AppLoader({
  size = 4,
  color = "primary",
}: AppLoaderProps) {
  const theme = useTheme();

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
      <MuiCircularProgress size={theme.spacing(size)} color={color} />
    </MuiBox>
  );
}
