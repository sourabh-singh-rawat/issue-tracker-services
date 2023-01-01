/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiGrid from '@mui/material/Grid';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material';
import theme from '../../../../config/mui.config';

import Label from '../../../../common/Label/Label';

const StyledSelect = styled(MuiSelect)(() => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.grey[700],
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: '6px',
    transitionDuration: '350ms',
    backgroundColor: theme.palette.grey[50],
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${theme.palette.grey[300]}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.grey[600]}`,
      transitionDuration: '250ms',
    },
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 32 * 6.5 + 8,
      borderRadius: '6px',
      marginTop: '6px',
      boxShadow: `0 1px 7px 0 ${theme.palette.grey[500]}`,
    },
  },
};

function IssuePrioritySelector({
  title,
  value,
  variant,
  isLoading,
  helperText,
  handleChange,
}) {
  const issuePriority = useSelector(
    (store) => store.issue.options.priority.rows,
  );

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid xs={12} item>
          {isLoading ? <MuiSkeleton width="20%" /> : <Label title={title} />}
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <MuiFormControl fullWidth>
            <StyledSelect
              MenuProps={MenuProps}
              name="priority"
              size="small"
              sx={{
                color: theme.palette.text.primary,
                height: variant === 'dense' ? '28px' : 'auto',
                fontSize: '13px',
                textTransform: 'capitalize',
                '&:hover': {
                  boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
                },
              }}
              value={value}
              displayEmpty
              onChange={handleChange}
            >
              {issuePriority.map(({ id, name }) => (
                <MuiMenuItem
                  key={id}
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                  value={id}
                >
                  {name}
                </MuiMenuItem>
              ))}
            </StyledSelect>
          </MuiFormControl>
        )}
      </MuiGrid>
      {helperText && (
        <MuiGrid xs={12} item>
          {isLoading ? (
            <MuiSkeleton height="75%" width="50%" />
          ) : (
            <MuiFormHelperText>
              <MuiTypography component="span" sx={{ fontSize: '13px' }}>
                {helperText}
              </MuiTypography>
            </MuiFormHelperText>
          )}
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default IssuePrioritySelector;
