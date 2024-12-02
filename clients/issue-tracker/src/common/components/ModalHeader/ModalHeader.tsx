import React from "react";

import { Grid2, useTheme } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";

import Close from "@mui/icons-material/Close";

export interface Props {
  title: string;
  subtitle: string;
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ModalHeader({ title, subtitle, handleClose }: Props) {
  const theme = useTheme();

  return (
    <MuiBox sx={{ mb: 2 }}>
      <Grid2 container rowSpacing={1}>
        <Grid2 size={12}>
          <MuiListItem
            secondaryAction={
              <MuiIconButton
                onClick={handleClose}
                sx={{
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
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
        </Grid2>
        <Grid2>
          <MuiTypography variant="body1">{subtitle}</MuiTypography>
        </Grid2>
      </Grid2>
    </MuiBox>
  );
}
