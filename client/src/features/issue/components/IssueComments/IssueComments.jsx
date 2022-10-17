import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import Comment from "../../../../common/Comment";
import AddComment from "../../../issue/components/AddComment";

import { setComments } from "../../../issue/issue.slice";

import { useGetIssueCommentsQuery } from "../../../issue/issue.api";
import { CircularProgress } from "@mui/material";

function IssueComments() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const getIssueCommentsQuery = useGetIssueCommentsQuery(id);
  const comments = useSelector((store) => store.issue.comments);

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
        <CircularProgress />
      ) : (
        <MuiGrid item xs={12}>
          <MuiGrid container rowSpacing={0.5}>
            {comments.rows.map(({ id, ...otherProps }) => {
              return (
                <MuiGrid key={id} item xs={12}>
                  <Comment id={id} {...otherProps} />
                </MuiGrid>
              );
            })}
          </MuiGrid>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default IssueComments;
