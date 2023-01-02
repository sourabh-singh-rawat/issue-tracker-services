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
    borderRadius: theme.shape.borderRadiusRounded,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.grey[1300],
    transitionDuration: '350ms',
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${theme.palette.grey[1300]}`,
    },
    '&:hover fieldset': {
      border: `2px solid ${theme.palette.grey[1000]}`,
      backgroundColor: 'transparent',
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
            value={!value ? 'UNASSIGNED' : value}
            onChange={handleChange}
          >
            {projectMembers.map(({ name, memberId, photoUrl }) => (
              <StyledMenuItem
                key={memberId}
                value={memberId}
                disableGutters
                disableRipple
              >
                <MuiGrid columnSpacing={1} container>
                  <MuiGrid item>
                    <MuiAvatar
                      src={photoUrl}
                      sx={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: theme.palette.grey[900],
                      }}
                    />
                  </MuiGrid>
                  <MuiGrid sx={{ color: theme.palette.grey[700] }} item>
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
                  </MuiGrid>
                </MuiGrid>
              </StyledMenuItem>
            ))}
            <StyledMenuItem value="UNASSIGNED">
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
                      backgroundColor: theme.palette.grey[900],
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
            </StyledMenuItem>
          </StyledSelect>
        </MuiFormControl>
      )}
    </>
  );
}

export default IssueAssigneeSelector;
