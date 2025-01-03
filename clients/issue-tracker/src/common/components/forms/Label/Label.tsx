import { FormLabel, Skeleton, Typography, useTheme } from "@mui/material";
import React from "react";

interface Props {
  id: string;
  title: React.ReactElement | string;
  color?: string;
  isLoading?: boolean;
}

export const Label = ({ id, title, isLoading, color }: Props) => {
  const theme = useTheme();

  return (
    <FormLabel htmlFor={id} sx={{ color: theme.palette.text.primary }}>
      {isLoading ? (
        <Skeleton width="20%" />
      ) : (
        <Typography variant="body2" fontWeight="500" color={color}>
          {title}
        </Typography>
      )}
    </FormLabel>
  );
};
