import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import AddComment from "../AddComment";
import CommentList from "../CommentList";

import { clearComments, setComments } from "../../issueComments.slice";
import { useGetIssueCommentsQuery } from "../../issueComments.api";

function IssueComments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.issueComments);
  const getIssueCommentsQuery = useGetIssueCommentsQuery(id);

  useEffect(() => {
    if (getIssueCommentsQuery.isSuccess)
      dispatch(
        setComments({
          rows: getIssueCommentsQuery.data.rows,
          rowCount: getIssueCommentsQuery.data.rowCount,
        })
      );
  }, [getIssueCommentsQuery.data]);

  useEffect(() => () => dispatch(clearComments()), []); // clearComments on unmount

  return (
    <MuiGrid container rowSpacing={1}>
      <MuiGrid item xs={12}>
        <AddComment />
      </MuiGrid>
      {comments.loading ? (
        <MuiGrid item xs={12}>
          <MuiLinearProgress />
        </MuiGrid>
      ) : (
        <MuiGrid item xs={12}>
          <CommentList rows={comments.rows} />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default IssueComments;
