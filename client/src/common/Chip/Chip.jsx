/* eslint-disable react/prop-types */
import React from 'react';

import MuiChip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import theme from '../../config/mui.config';

const StyledChip = styled(MuiChip)(() => ({
  fontWeight: 600,
}));

function Chip({ label, color, surfaceColor }) {
  return (
    <StyledChip
      backgroundColor={surfaceColor}
      label={label}
      size="small"
      sx={{
        color,
        backgroundColor: surfaceColor || theme.palette.grey[1400],
      }}
    />
  );
}

export default Chip;
