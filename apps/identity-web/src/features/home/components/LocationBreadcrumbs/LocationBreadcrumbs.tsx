import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";

type LocationCrumb = {
  label: string;
  to?: "/" | "/name";
};

type LocationBreadcrumbsProps = {
  items: LocationCrumb[];
};

export const LocationBreadcrumbs = ({ items }: LocationBreadcrumbsProps) => {
  return (
    <Breadcrumbs separator="›" aria-label="Breadcrumb">
      {items.map((item) =>
        item.to ? (
          <MuiLink
            key={item.label}
            component={Link}
            to={item.to}
            underline="hover"
            color="text.secondary"
          >
            {item.label}
          </MuiLink>
        ) : (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
};
