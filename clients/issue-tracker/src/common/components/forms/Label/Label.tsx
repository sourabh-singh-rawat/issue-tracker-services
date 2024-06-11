import React from "react";
import MuiTypography from "@mui/material/Typography";
import MuiFormLabel from "@mui/material/FormLabel";
import MuiSkeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material";

interface Props {
  id: string;
  title: string;
  color?: string;
  isLoading?: boolean;
}

function Label({ id, title, isLoading, color }: Props) {
  const theme = useTheme();

  return (
    <MuiFormLabel htmlFor={id} sx={{ color: theme.palette.text.primary }}>
      {isLoading ? (
        <MuiSkeleton width="20%" />
      ) : (
        <MuiTypography variant="body2" fontWeight="500" color={color}>
          {title}
        </MuiTypography>
      )}
    </MuiFormLabel>
  );
}

export default Label;
