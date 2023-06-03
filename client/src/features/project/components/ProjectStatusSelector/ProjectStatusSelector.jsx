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
    borderRadius: theme.shape.borderRadiusMedium,
    '& .MuiSvgIcon-root': {
      color: statuscolor,
      display: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
      backgroundColor: 'transparent',
    },
  },
  '& div': { padding: '0 !important' },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  paddingRight: 0,
  '&.MuiMenuItem-root': {
    padding: '0 10px',
    // '&:hover': { backgroundColor: theme.palette.grey[1200] },
  },
  '&.Mui-selected': {
    // color: theme.palette.primary[800],
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: theme.shadows[2],
      borderRadius: theme.shape.borderRadiusMedium,
      backgroundColor: theme.palette.common.white,
    },
  },
};

export default function ProjectStatusSelector({
  value,
  variant,
  helperText,
  handleChange,
}) {
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
            sx={{
              display: 'flex',
              height: variant === 'dense' ? '28px' : 'auto',
            }}
            value={value}
            onChange={handleChange}
          >
            {projectStatus.map(({ id, name, color }) => (
              <StyledMenuItem
                key={id}
                color={color}
                value={id}
                disableGutters
                disableRipple
              >
                <MuiTypography
                  sx={{
                    color,
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    fontWeight: 600,
                    margin: '5px',
                    padding: '2.5px 10px',
                    borderRadius: theme.shape.borderRadiusMedium,
                    backgroundColor: lighten(color, 0.8),
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
