import React from "react";
import MuiList from "@mui/material/List";
import Comment from "../Comment";

export default function CommentList({ rows = [] }) {
  return (
    <MuiList>
      {rows?.map(({ id, issueId, displayName, description, updatedAt }) => (
        <Comment
          key={id}
          id={id}
          issueId={issueId}
          displayName={displayName}
          description={description}
          updatedAt={updatedAt}
        />
      ))}
    </MuiList>
  );
}
