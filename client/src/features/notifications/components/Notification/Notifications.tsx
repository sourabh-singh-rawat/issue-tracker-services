import React from "react";
import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import MuiNotifications from "@mui/icons-material/Notifications";

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadiusMedium,
  ":hover": {
    backgroundColor: theme.palette.grey[700],
  },
}));

export default function Notifications() {
  return (
    <StyledIconButton color="inherit" disableRipple>
      <MuiNotifications />
    </StyledIconButton>
  );
}
