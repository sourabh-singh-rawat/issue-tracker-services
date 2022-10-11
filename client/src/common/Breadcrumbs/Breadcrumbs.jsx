import MuiLink from "@mui/material/Link";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

export default function Breadcrumbs({ items, loading }) {
  return (
    <MuiBreadcrumbs separator="/">
      {items.map(({ text, onClick }) => {
        return (
          <div key={Math.random()}>
            {loading ? (
              <MuiSkeleton variant="text" width="75px" height="20px" />
            ) : (
              <MuiLink
                onClick={onClick}
                underline="hover"
                sx={{ cursor: "pointer", color: "text.secondary" }}
              >
                <MuiTypography
                  variant="body2"
                  sx={{ ":hover": { color: "text.main" }, fontWeight: 600 }}
                >
                  {text}
                </MuiTypography>
              </MuiLink>
            )}
          </div>
        );
      })}
    </MuiBreadcrumbs>
  );
}
