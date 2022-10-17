import { parseISO, formatDistance } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import DeleteComment from "../DeleteComment";

const Comment = ({
  id,
  issue_id,
  name,
  description,
  photo_url,
  creation_date,
}) => {
  return (
    <MuiGrid
      container
      sx={{
        borderRadius: "4px",
        border: "1px solid #E3E4E6",
        padding: "8px 8px 8px 12px",
      }}
    >
      <MuiGrid item xs={12}>
        <MuiGrid
          container
          columnSpacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MuiGrid item>
            <MuiAvatar
              src={photo_url}
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "primary.main",
              }}
            >
              <MuiTypography variant="body2">
                {name.match(/\b(\w)/g)}
              </MuiTypography>
            </MuiAvatar>
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography variant="body2" fontWeight={600}>
              {name}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography fontSize="13px" sx={{ color: "text.secondary" }}>
              {formatDistance(parseISO(creation_date), new Date())} ago
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
      <MuiGrid item>
        <MuiGrid container>
          <MuiGrid item xs={12} sx={{ padding: "4px 0" }}>
            <MuiTypography variant="body2">{description}</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <Breadcrumbs separator="•">
              <MuiTypography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  ":hover": { cursor: "pointer" },
                }}
              >
                <a>Edit</a>
              </MuiTypography>
              <DeleteComment id={id} issue_id={issue_id} />
            </Breadcrumbs>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};

export default Comment;
