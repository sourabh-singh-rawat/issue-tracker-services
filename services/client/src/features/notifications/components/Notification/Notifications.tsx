import React from "react";
import { useTheme } from "@mui/material";
import MuiNotifications from "@mui/icons-material/Notifications";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton/StyledIconButton";

export default function Notifications() {
  const theme = useTheme();

  return (
    <StyledIconButton color="inherit" disableRipple>
      <MuiNotifications sx={{ color: theme.palette.text.secondary }} />
    </StyledIconButton>
  );
}
