import React from "react";

import { useTheme } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";

import Close from "@mui/icons-material/Close";

export interface ModalHeaderProps {
  title: string;
  subtitle: string;
  handleClose: () => void;
}

export default function ModalHeader({
  title,
  subtitle,
  handleClose,
}: ModalHeaderProps) {
  const theme = useTheme();

  return (
    <MuiBox sx={{ mb: 2 }}>
      <MuiListItem
        secondaryAction={
          <MuiIconButton
            onClick={handleClose}
            sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}
          >
            <Close />
          </MuiIconButton>
        }
        disableGutters
        disablePadding
      >
        <MuiTypography variant="h4" fontWeight="bold">
          {title}
        </MuiTypography>
      </MuiListItem>
      <MuiTypography variant="body1">{subtitle}</MuiTypography>
    </MuiBox>
  );
}
