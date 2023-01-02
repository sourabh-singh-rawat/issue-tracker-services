/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import { lighten, styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import Label from '../../../../common/Label/Label';
import theme from '../../../../config/mui.config';

const StyledSelect = styled(MuiSelect)(({ statuscolor = '#000' }) => ({
  transitionDuration: '350ms',
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'capitalize',
    borderRadius: theme.shape.borderRadiusRounded,
    backgroundColor: lighten(statuscolor, 0.85),
    '& .MuiSvgIcon-root': { color: statuscolor },
    transition: '350ms',
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${lighten(statuscolor, 0.85)}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${lighten(statuscolor, 0.65)}`,
    },
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  paddingLeft: '12px',
  paddingRight: '12px',
  transition: 'all 350ms',
  borderRadius: theme.shape.borderRadiusMedium,
  '&.MuiMenuItem-root': {
    margin: '0 4px',
    ':hover': { backgroundColor: theme.palette.grey[1300] },
  },
  '&.Mui-selected': { color: theme.palette.primary[1000] },
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

function IssueStatusSelector({
  title,
  value,
  variant,
  helperText,
  handleChange,
  isLoading,
}) {
  const issueStatus = useSelector((store) => store.issue.options.status.rows);

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
              name="status"
              size="small"
              statuscolor={
                issueStatus.find((status) => status.id === value)?.color
              }
              sx={{
                color: theme.palette.grey[700],
                height: variant === 'dense' ? '28px' : 'auto',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
              value={value}
              displayEmpty
              onChange={handleChange}
            >
              {issueStatus.map(({ id, name, color }) => (
                <StyledMenuItem
                  key={id}
                  value={id}
                  disableGutters
                  disableRipple
                >
                  <MuiTypography
                    overflow="hidden"
                    sx={{
                      color,
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

export default IssueStatusSelector;
