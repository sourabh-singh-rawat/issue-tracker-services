import FormLabel from "@mui/material/FormLabel";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { ReactElement } from "react";

export interface LabelProps {
  id: string;
  title: ReactElement | string;
  color?: string;
  isLoading?: boolean;
}

export const Label = ({ id, title, isLoading, color }: LabelProps) => {
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
