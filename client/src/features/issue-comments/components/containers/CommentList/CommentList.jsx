/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import MuiGrid from '@mui/material/Grid';

import Comment from '../Comment';

function CommentList({ rows }) {
  return (
    <MuiGrid rowSpacing={1} container>
      {rows &&
        rows.map(({ id, ...otherProps }) => (
          <MuiGrid key={id} xs={12} item>
            <Comment id={id} {...otherProps} />
          </MuiGrid>
        ))}
    </MuiGrid>
  );
}

export default CommentList;
