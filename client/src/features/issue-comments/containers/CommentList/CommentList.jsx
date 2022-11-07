import MuiGrid from "@mui/material/Grid";

import Comment from "../../../issue-comments/containers/Comment";

const CommentList = ({ rows }) => {
  return (
    <MuiGrid container rowSpacing={1}>
      {rows &&
        rows.map(({ id, ...otherProps }) => {
          return (
            <MuiGrid key={id} item xs={12}>
              <Comment id={id} {...otherProps} />
            </MuiGrid>
          );
        })}
    </MuiGrid>
  );
};

export default CommentList;
