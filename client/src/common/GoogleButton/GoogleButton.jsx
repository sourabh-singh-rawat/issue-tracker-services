/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';
import MuiGoogleIcon from '@mui/icons-material/Google';
import { styled } from '@mui/material/styles';
import theme from '../../config/mui.config';

const StyledButton = styled(MuiButton)(() => ({
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  color: theme.palette.grey[500],
  border: `2px solid ${theme.palette.grey[500]}`,
  borderRadius: theme.shape.borderRadiusLarge,
  boxShadow: theme.shadows[1],
  textTransform: 'none',
  '&:hover': {
    color: theme.palette.grey[1500],
    border: `2px solid ${theme.palette.primary[900]}`,
    backgroundColor: theme.palette.primary[900],
  },
}));

export default function GoogleButton({ onClick, message }) {
  return (
    <StyledButton
      startIcon={<MuiGoogleIcon />}
      variant="outlined"
      fullWidth
      onClick={onClick}
    >
      {message}
    </StyledButton>
  );
}
