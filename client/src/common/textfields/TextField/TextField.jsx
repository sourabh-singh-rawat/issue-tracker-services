/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Fragment } from 'react';

import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTextField from '@mui/material/TextField';

import Label from '../../utilities/Label';

const StyledTextField = styled(MuiTextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root ': {
    fontSize: '14px',
    color: theme.palette.text.primary,
    borderRadius: '6px',
    // backgroundColor: theme.palette.grey[50],
    '& fieldset': {
      borderRadius: '6px',
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.grey[700]}`,
      transitionDuration: '250ms',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.default,
      transitionDuration: '250ms',
      '& fieldset': {
        border: error
          ? `1px solid ${theme.palette.error.main}`
          : `1px solid ${theme.palette.primary.main}`,
        transitionDuration: '250ms',
      },
    },
    '&.Mui-disabled': {
      fontWeight: 500,
      backgroundColor: theme.palette.grey[200],
      '& fieldset': {
        border: `1px solid ${theme.palette.grey[300]}`,
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
  multiline,
  error,
  helperText,
  isLoading,
  ...otherProps
}) {
  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {isLoading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <Label title={title} error={error} />
          )}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <>
            <MuiSkeleton />
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton />}
            {multiline && <MuiSkeleton width="75%" />}
          </>
        ) : (
          <StyledTextField
            size="small"
            name={name && name.toLowerCase()}
            rows={rows}
            value={value}
            error={error}
            helperText={helperText}
            multiline={multiline}
            fullWidth
            {...otherProps}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}

export default TextField;
