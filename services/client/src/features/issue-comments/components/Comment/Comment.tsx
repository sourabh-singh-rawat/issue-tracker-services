import React from "react";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import MuiGrid from "@mui/material/Grid";
import MuiListItem from "@mui/material/ListItem";
import MuiTypography from "@mui/material/Typography";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

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
      <MuiListItemAvatar
        sx={{
          minWidth: 0,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
        }}
      >
        <Avatar
          label={displayName}
          width={theme.spacing(3)}
          height={theme.spacing(3)}
        />
      </MuiListItemAvatar>
      <MuiListItemText
        primary={
          <MuiBreadcrumbs separator="•">
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <MuiTypography
                variant="body2"
                fontWeight={600}
                sx={{ "&:hover": { color: theme.palette.primary.main } }}
              >
                {displayName}
              </MuiTypography>
            </Link>
            <MuiTypography variant="body2">
              {dayjs(updatedAt).fromNow()}
            </MuiTypography>
          </MuiBreadcrumbs>
        }
        secondary={
          <MuiGrid rowSpacing={0.5} container>
            <MuiGrid item xs={12}>
              <MuiTypography variant="body2">{description}</MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiBreadcrumbs separator="•">
                <DeleteCommentButton id={issueId} commentId={id} />
              </MuiBreadcrumbs>
            </MuiGrid>
          </MuiGrid>
        }
      />
    </MuiListItem>
  );
}
