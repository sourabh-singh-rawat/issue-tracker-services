import React from "react";
import { useTheme } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

interface AvatarProps {
  variant?: "circular" | "rounded" | "square";
  label?: string;
  photoUrl?: string;
}

export default function Avatar({ photoUrl, label, variant }: AvatarProps) {
  const theme = useTheme();

  return (
    <MuiAvatar
      src={photoUrl}
      variant={variant}
      sx={{
        width: "20px",
        height: "20px",
        backgroundColor: theme.palette.grey[500],
      }}
    >
      <MuiTypography>{label && label[0]}</MuiTypography>
    </MuiAvatar>
  );
}
