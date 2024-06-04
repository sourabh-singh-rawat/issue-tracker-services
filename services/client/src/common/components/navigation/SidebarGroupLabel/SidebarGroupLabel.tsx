import React from "react";
import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

interface Props {
  title: string;
}

export default function SidebarGroupLabel({ title }: Props) {
  const theme = useTheme();

  return (
    <MuiTypography
      sx={{
        ml: theme.spacing(2.75),
        py: theme.spacing(1),
        pt: theme.spacing(1.5),
        fontWeight: 600,
        color: theme.palette.text.secondary,
      }}
      variant="body2"
    >
      {title}
    </MuiTypography>
  );
}
