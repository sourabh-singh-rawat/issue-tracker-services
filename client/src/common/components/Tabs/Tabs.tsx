/* eslint-disable react/jsx-props-no-spreading */
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
          opacity: 1,
          minWidth: "auto",
          marginRight: theme.spacing(4),
          fontSize: theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
        },
        "& .Mui-selected": { color: theme.palette.primary.main },
      }}
    />
  );
}
