/* eslint-disable react/prop-types */
import React from 'react';

import MuiChip from '@mui/material/Chip';

function Chip({ id }) {
  return (
    <MuiChip
      label={id}
      size="small"
      sx={{
        borderRadius: '6px',
      }}
    />
  );
}

export default Chip;
