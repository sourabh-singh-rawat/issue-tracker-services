import MuiSkeleton from "@mui/material/Skeleton";
import MuiLink from "@mui/material/Link";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

const Breadcrumbs = ({ items, loading }) => {
  return (
    <MuiBreadcrumbs separator="/">
      {items.map(({ text, onClick }, index) => (
        <div key={Math.random()}>
          {loading ? (
            <MuiSkeleton variant="text" width="75px" height="20px" />
          ) : (
            <MuiLink
              key={index}
              onClick={onClick}
              underline="hover"
              sx={{ cursor: "pointer", color: "text.subtitle1" }}
            >
              <MuiTypography
                variant="body2"
                sx={{ fontWeight: "bold", ":hover": { color: "text.main" } }}
              >
                {text}
              </MuiTypography>
            </MuiLink>
          )}
        </div>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
