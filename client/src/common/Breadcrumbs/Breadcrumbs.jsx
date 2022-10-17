import MuiLink from "@mui/material/Link";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

const Breadcrumbs = ({ items, loading }) => {
  return (
    <MuiBreadcrumbs separator="/">
      {items.map(({ text, onClick }) => {
        return (
          <span key={text}>
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
                  sx={{
                    fontWeight: 600,
                    ":hover": {
                      color: "text.main",
                    },
                  }}
                >
                  {text}
                </MuiTypography>
              </MuiLink>
            )}
          </span>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
