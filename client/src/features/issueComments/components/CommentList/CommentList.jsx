import MuiGrid from "@mui/material/Grid";

import Comment from "../Comment";

const CommentList = ({ rows }) => {
  return (
    <MuiGrid container rowSpacing={0.5}>
      {rows.map(({ id, ...otherProps }) => {
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
