import React, { useEffect } from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import AddComment from "../../components/AddComment";
import CommentList from "../../components/CommentList";

import { setComments } from "../../issue-comments.slice";
import { useAppDispatch } from "../../../../common/hooks";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useGetIssueCommentListQuery } from "../../../../api/generated/issue.api";

export default function IssueComments() {
  const theme = useTheme();
  const { id } = useSelectedTab();
  const dispatch = useAppDispatch();

  const {
    data: issueCommentList,
    isSuccess,
    isLoading,
  } = useGetIssueCommentListQuery({ id });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setComments({
          rows: issueCommentList?.rows,
          rowCount: issueCommentList?.filteredRowCount,
        }),
      );
    }
  }, [issueCommentList]);

  return (
    <MuiGrid container spacing={1} sx={{ py: theme.spacing(2) }}>
      <MuiGrid xs={12} item>
        <AddComment />
      </MuiGrid>
      {isLoading ? (
        <MuiGrid xs={12} item>
          <MuiLinearProgress />
        </MuiGrid>
      ) : (
        <MuiGrid xs={12} item>
          <CommentList rows={issueCommentList?.rows} />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}
