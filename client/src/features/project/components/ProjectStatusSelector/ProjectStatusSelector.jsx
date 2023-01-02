/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

// import MuiCircleIcon from '@mui/icons-material/Circle';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import MuiGrid from '@mui/material/Grid';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import { lighten, styled } from '@mui/material/styles';
import theme from '../../../../config/mui.config';

const StyledSelect = styled(MuiSelect)(({ statuscolor = '#000' }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: theme.shape.borderRadiusRounded,
    textTransform: 'capitalize',
    backgroundColor: lighten(statuscolor, 0.8),
    transitionDuration: '350ms',
    '& .MuiSvgIcon-root': { color: statuscolor },
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${lighten(statuscolor, 0.8)}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${lighten(statuscolor, 0.6)}`,
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
      boxShadow: theme.shadows[2],
      borderRadius: theme.shape.borderRadiusMedium,
      backgroundColor: theme.palette.common.white,
    },
  },
};

function ProjectStatusSelector({ value, variant, helperText, handleChange }) {
  const projectStatus = useSelector(
    (store) => store.project.options.status.rows,
  );
  const isLoading = useSelector(
    (store) => store.project.options.status.isLoading,
  );

  return (
    <MuiGrid container>
      <MuiFormControl fullWidth>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <StyledSelect
            MenuProps={MenuProps}
            name="status"
            size="small"
            statuscolor={
              projectStatus.find((status) => status.id === value)?.color
            }
            sx={{ height: variant === 'dense' ? '28px' : 'auto' }}
            value={value}
            onChange={handleChange}
          >
            {projectStatus.map(({ id, name }) => (
              <StyledMenuItem key={id} value={id} disableGutters disableRipple>
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
        )}
      </MuiFormControl>
      {isLoading ? (
        <MuiSkeleton width="200px" />
      ) : (
        helperText && (
          <MuiFormHelperText>
            <MuiTypography component="span" sx={{ fontSize: '13px' }}>
              {helperText}
            </MuiTypography>
          </MuiFormHelperText>
        )
      )}
    </MuiGrid>
  );
}

export default ProjectStatusSelector;
