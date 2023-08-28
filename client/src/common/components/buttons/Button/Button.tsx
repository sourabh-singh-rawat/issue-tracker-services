import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material";

interface ButtonProps {
  label: string;
  hoverBgColor: string;
  type: MuiButtonProps["type"];
  onClick?: (e: unknown) => void;
}

export default function Button({
  label,
  onClick,
  type,
  hoverBgColor,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <MuiButton
      sx={{
        color: "white",
        borderRadius: theme.shape.borderRadiusMedium,
        textTransform: "none",
        backgroundColor: theme.palette.primary.main,
        "&:hover": { backgroundColor: hoverBgColor },
      }}
      onClick={onClick}
      disableRipple
      type={type}
    >
      {label}
    </MuiButton>
  );
}
