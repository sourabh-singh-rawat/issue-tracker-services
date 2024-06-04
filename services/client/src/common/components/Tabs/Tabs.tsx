import React from "react";
import MuiTabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material";

export default function Tabs(props) {
  const theme = useTheme();

  return (
    <MuiTabs
      {...props}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        ".MuiButtonBase-root": {
          padding: 0,
          minWidth: "auto",
          opacity: 1,
          marginRight: theme.spacing(4),
          fontSize: theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
}
