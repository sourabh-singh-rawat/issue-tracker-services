import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import AddComment from "../../containers/AddComment";
import CommentList from "../../containers/CommentList";

import { clearComments, setComments } from "../../issue-comments.slice";
import { useGetIssueCommentsQuery } from "../../issue-comments.api";

const IssueComments = () => {
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
};

export default IssueComments;
