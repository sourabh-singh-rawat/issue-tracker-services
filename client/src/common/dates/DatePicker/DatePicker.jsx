/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { Fragment } from 'react';
import en_IN from 'date-fns/locale/en-IN';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { styled } from '@mui/material';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiCircularProgress from '@mui/material/CircularProgress';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

import Label from '../../utilities/Label';
import TextField from '../../textfields/TextField';

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
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en_IN}>
        {isLoading ? (
          <MuiCircularProgress />
        ) : (
          <StyledDatePicker
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField
                size="small"
                variant="outlined"
                name={name}
                onChange={handleChange}
                fullWidth
                {...params}
              />
            )}
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
