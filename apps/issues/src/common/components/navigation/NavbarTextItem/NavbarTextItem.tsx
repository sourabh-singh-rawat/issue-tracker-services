import { useTheme } from "@mui/material";
import MuiLink from "@mui/material/Link";
import MuiTypography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";

export interface NavbarTextItemProps {
  to: string;
  label: string;
}

export default function NavbarTextItem({ to, label }: NavbarTextItemProps) {
  const theme = useTheme();

  return (
    <MuiLink
      underline="none"
      sx={{
        color: theme.palette.background.paper,
        "&:hover": { color: theme.palette.primary.main },
      }}
    >
      <Link
        to={to as "/"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MuiTypography fontWeight="500">{label}</MuiTypography>
      </Link>
    </MuiLink>
  );
}
