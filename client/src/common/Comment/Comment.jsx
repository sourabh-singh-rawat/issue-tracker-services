import { parseISO, format } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DeleteComment from "../../features/issue/components/DeleteComment";

export default function Comment({
  id,
  issue_id,
  description,
  creation_date,
  name,
}) {
  return (
    <MuiGrid
      container
      sx={{
        padding: "8px 12px",
        borderRadius: "4px",
      }}
    >
      <MuiGrid item>
        <MuiAvatar
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
        <MuiGrid container sx={{ paddingLeft: "8px" }} columnSpacing={1}>
          <MuiGrid item>
            <MuiTypography variant="body2" fontWeight={600}>
              {name}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item>
            <MuiTypography fontSize="13px" sx={{ color: "text.subtitle1" }}>
              {format(parseISO(creation_date), "PPPp")}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
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
}
