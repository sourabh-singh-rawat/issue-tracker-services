import { parseISO, format, formatDistance } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DeleteComment from "../../features/issue/components/DeleteComment";

export default function Comment({
  id,
  issue_id,
  name,
  description,
  creation_date,
  photo_url,
}) {
  return (
    <MuiGrid
      container
      sx={{
        paddingTop: "8px",
        borderRadius: "4px",
      }}
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
          <MuiTypography variant="body2">{name.match(/\b(\w)/g)}</MuiTypography>
        </MuiAvatar>
      </MuiGrid>
      <MuiGrid item>
        <MuiGrid container sx={{ paddingLeft: "16px" }} columnSpacing={1}>
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
          <MuiGrid item xs={12}>
            <MuiTypography variant="body2">{description}</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <Breadcrumbs separator="•">
              <MuiTypography
                sx={{
                  fontSize: "14px",
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
}
