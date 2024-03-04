/* eslint-disable react/prop-types */
import React from "react";

import MuiButton from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material";

export default function CancelButton({ label, onClick }) {
  const theme = useTheme();

  return (
    <MuiButton
      onClick={onClick}
      sx={{
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadiusMedium,
        textTransform: "none",
        "&:focus": {
          boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
}
