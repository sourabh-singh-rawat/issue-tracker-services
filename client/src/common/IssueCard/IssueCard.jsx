import { Fragment } from "react";
import { theme } from "../../app/mui.config";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiPestControlIcon from "@mui/icons-material/PestControl";

const IssueCard = ({
  title,
  count,
  link,
  isLoading,
  color,
  backgroundColor,
}) => {
  return (
    <Fragment>
      {isLoading ? (
        <MuiSkeleton
          variant="rectangular"
          height="90px"
          sx={{ borderRadius: "6px" }}
        />
      ) : (
        <MuiGrid
          container
          sx={{
            cursor: "pointer",
            padding: "16px",
            minHeight: "60px",
            border: `none`,
            borderRadius: "8px",
            transition: "250ms",
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.palette.common.white,

            border: `2px solid ${
              backgroundColor
                ? backgroundColor
                : theme.palette.outline.surfaceVariant
            }`,
            ":hover": {
              backgroundColor: backgroundColor
                ? theme.palette.primary.dark
                : theme.palette.outline.surfaceVariant,
              border: `2px solid ${
                backgroundColor
                  ? theme.palette.primary.dark
                  : theme.palette.outline.surfaceVariant
              }`,
              boxShadow: 4,
            },
          }}
        >
          <MuiGrid item xs={12} display="flex">
            <MuiTypography
              variant="body2"
              fontWeight={600}
              sx={{
                color: color ? color : theme.palette.text.primary,
                opacity: 0.6,
                textTransform: "capitalize",
                flexGrow: 1,
              }}
            >
              {title}:
            </MuiTypography>
            <MuiPestControlIcon
              sx={{
                opacity: 0.6,
                color: color ? color : theme.palette.text.primary,
              }}
            />
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiTypography
              variant="h4"
              fontWeight={400}
              sx={{
                color: color ? color : theme.palette.text.primary,
                fontFamily: "Roboto Mono",
              }}
            >
              {count}
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      )}
    </Fragment>
  );
};

export default IssueCard;
