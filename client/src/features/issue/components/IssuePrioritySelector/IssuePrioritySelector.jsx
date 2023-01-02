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
    borderRadius: theme.shape.borderRadiusRounded,
    backgroundColor: theme.palette.grey[1300],
    '& fieldset': {
      border: `2px solid ${theme.palette.grey[1300]}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.grey[1000]}`,
    },
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  paddingLeft: '12px',
  paddingRight: '12px',
  transition: 'all 350ms',
  '&.MuiMenuItem-root': {
    borderRadius: theme.shape.borderRadiusMedium,
    margin: '0 4px',
    '&:hover': {
      backgroundColor: theme.palette.grey[1200],
    },
  },
  '&.Mui-selected': {
    color: theme.palette.primary[800],
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: '6px',
      borderRadius: theme.shape.borderRadiusLarge,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[2],
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
              }}
              value={value}
              displayEmpty
              onChange={handleChange}
            >
              {issuePriority.map(({ id, name }) => (
                <StyledMenuItem
                  key={id}
                  value={id}
                  disableGutters
                  disableRipple
                >
                  <MuiTypography
                    overflow="hidden"
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                    textOverflow="ellipsis"
                    variant="body2"
                  >
                    {name}
                  </MuiTypography>
                </StyledMenuItem>
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
