import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Comment from "../../../../common/Comment";
import AddIssueComments from "../AddIssueComment";

import { setComments } from "../../issue.slice";

import { useGetIssueCommentsQuery } from "../../issue.api";

function IssueComments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.issue.comments);
  const { data, isSuccess } = useGetIssueCommentsQuery(id);

  useEffect(() => {
    if (data) dispatch(setComments(data));
  }, [isSuccess]);

  return (
    <Fragment>
      <AddIssueComments />
      {comments.map(({ id, ...otherProps }) => {
        return <Comment key={id} {...otherProps} />;
      })}
    </Fragment>
  );
}

export default IssueComments;
