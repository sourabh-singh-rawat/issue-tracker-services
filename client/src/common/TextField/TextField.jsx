/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import Label from '../Label';

const StyledTextField = styled(MuiTextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root ': {
    fontSize: '14px',
    color: theme.palette.text.primary,
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[200],
    '& fieldset': {
      borderRadius: '6px',
      border: `2px solid ${theme.palette.grey[200]}`,
    },
    '&:hover fieldset': {
      border: `2px solid ${theme.palette.grey[600]}`,
      transitionDuration: '250ms',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.common.white,
      transitionDuration: '250ms',
      '& fieldset': {
        border: error
          ? `2px solid ${theme.palette.error.main}`
          : `2px solid ${theme.palette.primary.main}`,
        transitionDuration: '250ms',
      },
    },
    '&.Mui-disabled': {
      fontWeight: 500,
      backgroundColor: theme.palette.grey[200],
      '& fieldset': {
        border: `2px solid ${theme.palette.grey[300]}`,
      },
    },
  },
  '& .MuiFormHelperText-contained': {
    fontSize: '13px',
    marginLeft: 0,
  },
}));

function TextField({
  name,
  value,
  title,
  rows,
  error,
  multiline,
  helperText,
  isLoading,
  ...otherProps
}) {
  return (
    <MuiGrid container>
      {title && (
        <MuiGrid xs={12} item>
          {isLoading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <Label error={error} title={title} />
          )}
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        {isLoading ? (
          <>
            <MuiSkeleton />
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton width="75%" />}
          </>
        ) : (
          <StyledTextField
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            error={error}
            helperText={helperText}
            multiline={multiline}
            name={name && name.toLowerCase()}
            rows={rows}
            size="small"
            value={value}
            fullWidth
            {...otherProps}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}

export default TextField;
