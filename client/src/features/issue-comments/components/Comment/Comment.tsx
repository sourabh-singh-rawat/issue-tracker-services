import React from "react";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";

import DeleteCommentButton from "../DeleteCommentButton";
import Avatar from "../../../../common/components/Avatar";

interface CommentProps {
  id: string;
  issueId: string;
  displayName: string;
  description: string;
  updatedAt: string;
}

export default function Comment({
  id,
  issueId,
  displayName,
  description,
  updatedAt,
}: CommentProps) {
  const theme = useTheme();

  return (
    <MuiListItem disableGutters disablePadding>
      <MuiListItemAvatar>
        <Avatar
          label={displayName}
          width={theme.spacing(4)}
          height={theme.spacing(4)}
        />
      </MuiListItemAvatar>
      <MuiListItemText
        primary={
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
            to="/profile"
          >
            <MuiTypography
              variant="body2"
              fontWeight={600}
              sx={{ "&:hover": { color: theme.palette.primary.main } }}
            >
              {displayName}
            </MuiTypography>
          </Link>
        }
        secondary={
          <MuiGrid container>
            <MuiGrid item xs={12}>
              <MuiTypography variant="body2">{description}</MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12}>
              <Breadcrumbs separator="•">
                <MuiTypography variant="body2">
                  {dayjs(updatedAt).fromNow()}
                </MuiTypography>
                {/* <MuiTypography
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      color: theme.palette.primary.main,
                    },
                  }}
                  variant="body2"
                  fontWeight={600}
                >
                  Edit
                </MuiTypography> */}
                <DeleteCommentButton id={issueId} commentId={id} />
              </Breadcrumbs>
            </MuiGrid>
          </MuiGrid>
        }
      />
    </MuiListItem>
  );
}
