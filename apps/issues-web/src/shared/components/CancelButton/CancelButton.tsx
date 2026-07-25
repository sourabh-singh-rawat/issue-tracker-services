/* eslint-disable react/prop-types */
import React from "react";

import MuiButton from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material";

interface CancelButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CancelButton({ label, onClick }: CancelButtonProps) {
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
