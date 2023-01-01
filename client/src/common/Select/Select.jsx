/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[200],
    '& fieldset': {
      border: `2px solid ${theme.palette.grey[200]}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.grey[400]}`,
      transitionDuration: '250ms',
    },
  },
}));

export default function Select({
  title,
  items,
  helperText,
  defaultValue,
  ...otherProps
}) {
  return (
    <>
      {title && (
        <MuiTypography
          fontWeight={600}
          sx={{ paddingBottom: 1 }}
          variant="body2"
        >
          {title}
        </MuiTypography>
      )}
      <MuiFormControl fullWidth>
        <StyledSelect
          defaultValue={defaultValue}
          size="small"
          sx={{ color: 'text.primary', fontSize: '14px', fontWeight: 600 }}
          displayEmpty
          {...otherProps}
        >
          {items.map(({ id, name }) => (
            <MuiMenuItem
              key={id}
              sx={{
                color: 'text.primary',
                textTransform: 'capitalize',
                fontSize: '14px',
                fontWeight: 600,
              }}
              value={id}
            >
              {name}
            </MuiMenuItem>
          ))}
        </StyledSelect>
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography component="span" variant="body2">
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </>
  );
}
