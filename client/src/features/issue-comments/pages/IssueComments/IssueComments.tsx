import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import AddComment from "../../components/AddComment";
import CommentList from "../../components/CommentList";

import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import { useGetIssueCommentListQuery } from "../../../../api/generated/issue.api";
import { setComments } from "../../issue-comments.slice";
// import { setComments } from "../../issue-comments.slice";

function IssueComments() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const comments = useAppSelector((store) => store.issueComments);

  const {
    data: issueCommentList,
    isSuccess,
    isLoading,
  } = useGetIssueCommentListQuery({
    id,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setComments({
          rows: issueCommentList?.rows,
          rowCount: issueCommentList?.rowCount,
        }),
      );
    }
  }, [issueCommentList]);

  return (
    <MuiGrid rowSpacing={1} container>
      <MuiGrid xs={12} item>
        <AddComment />
      </MuiGrid>
      {isLoading ? (
        <MuiGrid xs={12} item>
          <MuiLinearProgress />
        </MuiGrid>
      ) : (
        <MuiGrid xs={12} item>
          <CommentList rows={comments.rows} />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default IssueComments;
