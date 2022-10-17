import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Comment from "../Comment";
import AddComment from "../AddComment";

import { setComments } from "../../issueComments.slice";
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
