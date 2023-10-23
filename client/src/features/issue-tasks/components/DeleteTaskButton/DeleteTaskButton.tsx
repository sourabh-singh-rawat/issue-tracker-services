import React from "react";
import { useTheme } from "@mui/material";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import MuiIconButton from "@mui/material/IconButton";

interface DeleteButtonProps {
  onClick: () => void;
}

export default function DeleteTaskButton({ onClick }: DeleteButtonProps) {
  const theme = useTheme();

  return (
    <MuiIconButton
      size="small"
      sx={{
        color: theme.palette.text.primary,
        border: theme.shape.borderRadiusNone,
        boxShadow: "none",
        backgroundColor: "transparent",
        ":hover": {
          color: theme.palette.text.secondary,
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      }}
      onClick={onClick}
    >
      <MuiDeleteIcon />
    </MuiIconButton>
  );
}
