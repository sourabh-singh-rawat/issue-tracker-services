/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';

import MuiAvatar from '@mui/material/Avatar';
import MuiFormControl from '@mui/material/FormControl';
import MuiGrid from '@mui/material/Grid';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import theme from '../../config/mui.config';

import Label from '../Label';

const StyledSelect = styled(MuiSelect)(() => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.grey[700],
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: '6px',
    textTransform: 'capitalize',
    backgroundColor: theme.palette.grey[50],
    transitionDuration: '350ms',
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${theme.palette.grey[300]}`,
    },
    '&:hover fieldset': {
      border: `2px solid ${theme.palette.grey[600]}`,
      backgroundColor: 'transparent',
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

function IssueAssigneeSelector({
  title,
  value,
  isLoading,
  fullWidth,
  handleChange,
  projectMembers,
}) {
  return (
    <>
      {isLoading ? (
        <MuiGrid container>
          <MuiGrid xs={12} item>
            <MuiSkeleton />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiFormControl fullWidth={fullWidth}>
          {title && <Label title={title} />}
          <StyledSelect
            MenuProps={MenuProps}
            name="assigneeId"
            size="small"
            sx={{
              '&:hover': {
                boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
              },
            }}
            value={!value ? 0 : value}
            onChange={handleChange}
          >
            {projectMembers.map(({ name, memberId, photoUrl }) => (
              <MuiMenuItem
                key={memberId}
                sx={{ fontSize: '13px', fontWeight: 600 }}
                value={memberId}
              >
                <MuiGrid columnSpacing={1} container>
                  <MuiGrid item>
                    <MuiAvatar
                      src={photoUrl}
                      sx={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: theme.palette.grey[500],
                      }}
                    />
                  </MuiGrid>
                  <MuiGrid sx={{ color: theme.palette.grey[700] }} item>
                    {name}
                  </MuiGrid>
                </MuiGrid>
              </MuiMenuItem>
            ))}
            <MuiMenuItem value={0}>
              <MuiGrid
                columnSpacing={1}
                sx={{ alignItems: 'center' }}
                container
              >
                <MuiGrid item>
                  <MuiAvatar
                    sx={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: theme.palette.grey[500],
                    }}
                  />
                </MuiGrid>
                <MuiGrid item>
                  <MuiTypography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: theme.palette.grey[700],
                    }}
                    variant="body2"
                  >
                    Unassigned
                  </MuiTypography>
                </MuiGrid>
              </MuiGrid>
            </MuiMenuItem>
          </StyledSelect>
        </MuiFormControl>
      )}
    </>
  );
}

export default IssueAssigneeSelector;
