/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material";
import MuiEditIcon from "@mui/icons-material/Edit";
import MuiIconButton from "@mui/material/IconButton";

export default function ProjectEditButton({ id }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MuiIconButton
      size="small"
      sx={{
        transition: "ease-in-out 0.2s",
        "& svg": { width: "0.875em" },
        "&:hover": { color: theme.palette.primary.main },
      }}
      onClick={() => navigate(`/projects/${id}/settings`)}
      disableRipple
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}
