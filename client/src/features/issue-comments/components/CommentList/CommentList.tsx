import React from "react";

import MuiList from "@mui/material/List";

import Comment from "../Comment";

export default function CommentList({ rows }) {
  return (
    <MuiList>
      {rows?.map(({ id, ...otherProps }) => (
        <Comment id={id} {...otherProps} />
      ))}
    </MuiList>
  );
}
