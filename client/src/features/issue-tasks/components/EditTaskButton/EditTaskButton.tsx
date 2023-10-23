import React from "react";

import MuiEditIcon from "@mui/icons-material/Edit";
import MuiIconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";

interface EditTaskButtonProps {
  onClick: () => void;
}

function EditTaskButton({ onClick }: EditTaskButtonProps) {
  const theme = useTheme();

  return (
    <MuiIconButton
      sx={{
        color: theme.palette.text.primary,
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
        ":hover": {
          color: theme.palette.text.secondary,
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      }}
      disableRipple
      onClick={onClick}
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}

export default EditTaskButton;
