import React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";

interface AvatarProps {
  variant?: "circular" | "rounded" | "square";
  label?: string;
  photoUrl?: string;
}

export default function Avatar({ variant, label, photoUrl }: AvatarProps) {
  return (
    <MuiAvatar
      src={photoUrl}
      variant={variant}
      sx={{ width: "23px", height: "23px" }}
    >
      <MuiTypography fontWeight="600">{label && label[0]}</MuiTypography>
    </MuiAvatar>
  );
}
