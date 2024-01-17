import React from "react";

import { useTheme } from "@mui/material";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useGetIssueCommentListQuery } from "../../../../api/generated/issue.api";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";

export default function IssueComments() {
  const theme = useTheme();
  const { id } = useSelectedTab();

  const { data: issueCommentList, isLoading } = useGetIssueCommentListQuery({
    id,
  });

  return (
    <MuiGrid container spacing={1} sx={{ py: theme.spacing(2) }}>
      <MuiGrid xs={12} item>
        <CommentForm />
      </MuiGrid>
      <MuiGrid xs={12} item>
        {isLoading ? (
          <MuiLinearProgress />
        ) : (
          <CommentList rows={issueCommentList?.rows} />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}
