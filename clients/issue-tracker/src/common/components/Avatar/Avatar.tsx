import { useTheme } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import { AppLoader } from "../AppLoader";

interface AvatarProps {
  width?: string | number;
  height?: string | number;
  variant?: "circular" | "rounded" | "square";
  label?: string | null;
  photoUrl?: string;
  color?: string;
  fontSize?: string;
  isLoading?: boolean;
}

export default function Avatar({
  variant,
  label,
  photoUrl,
  width = 22,
  height = 22,
  fontSize,
  isLoading = false,
}: AvatarProps) {
  const theme = useTheme();

  return isLoading ? (
    <AppLoader size={3} />
  ) : (
    <MuiAvatar
      src={photoUrl}
      variant={variant}
      sx={{
        width,
        height,
        fontSize: theme.typography.body1,
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <MuiTypography fontWeight="600" textAlign="center" fontSize={fontSize}>
        {label && label[0]}
      </MuiTypography>
    </MuiAvatar>
  );
}
