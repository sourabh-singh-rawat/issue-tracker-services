import { parseISO, formatDistance } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import DeleteComment from "../DeleteComment";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

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
        padding: "12px",
        border: "1px solid #E3E4E6",
        borderRadius: "6px",
      }}
    >
      <MuiGrid item sx={{ width: "60px", padding: "0 5px" }}>
        <MuiAvatar
          src={photo_url}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "primary.main",
          }}
        >
          <MuiTypography variant="body2">{name.match(/\b(\w)/g)}</MuiTypography>
        </MuiAvatar>
      </MuiGrid>
      <MuiGrid item width={"calc(100% - 60px)"}>
        <MuiGrid container>
          <MuiGrid item>
            <Link to="/profile" style={{ color: "#080F0F" }}>
              <MuiTypography variant="body2" fontWeight={600}>
                {name}
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiTypography sx={{ color: "text.secondary", fontSize: "13px" }}>
              {formatDistance(parseISO(creation_date), new Date())} ago
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiGrid container>
              <MuiGrid item xs={12} sx={{ paddingTop: "4px" }}>
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
      </MuiGrid>
    </MuiGrid>
  );
};

export default Comment;
