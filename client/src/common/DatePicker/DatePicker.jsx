/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enIn from 'date-fns/locale/en-IN';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import MuiCircularProgress from '@mui/material/CircularProgress';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material';

import Label from '../Label';
import TextField from '../TextField';

const StyledDatePicker = styled(MuiDatePicker)(({ theme }) => ({
  '& fieldset': {
    color: theme.palette.text.primary,
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.grey[200],
  },
}));

function DatePicker({
  name,
  title,
  value,
  onChange,
  isLoading,
  handleChange,
  helperText,
}) {
  return (
    <>
      {isLoading ? (
        <MuiSkeleton width="20%" />
      ) : (
        title && <Label title={title} />
      )}
      <LocalizationProvider adapterLocale={enIn} dateAdapter={AdapterDateFns}>
        {isLoading ? (
          <MuiCircularProgress />
        ) : (
          <StyledDatePicker
            renderInput={(params) => (
              <TextField
                name={name}
                size="small"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                {...params}
              />
            )}
            value={value}
            onChange={onChange}
          />
        )}
      </LocalizationProvider>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" sx={{ fontSize: '13px' }}>
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </>
  );
}

export default DatePicker;
