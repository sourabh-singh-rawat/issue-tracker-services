import React from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Title from "../Title";

interface TitleSectionProps {
  isLoading: boolean;
}

export default function TitleSection({
  page,
  updateTitle,
  updateTitleQuery,
  statusSelector,
  prioritySelector,
  isLoading,
}: TitleSectionProps) {
  const theme = useTheme();
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item>
        <Title
          page={page}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
      <MuiGrid sx={{ color: theme.palette.grey[700] }} xs={12} item>
        <MuiBreadcrumbs separator="•">
          {isLoading ? <MuiSkeleton width="80px" /> : statusSelector}
          {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography component="span" fontWeight={600} variant="body2">
              {type[0].toUpperCase()}
              {type.slice(1, -1)}
            </MuiTypography>
          )}
          {isLoading ? (
            <MuiSkeleton width="80px" />
          ) : (
            <MuiTypography component="span" fontWeight={600} variant="body2">
              {page.updatedAt && dayjs(page.updatedAt).fromNow()}
            </MuiTypography>
          )}
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
}
