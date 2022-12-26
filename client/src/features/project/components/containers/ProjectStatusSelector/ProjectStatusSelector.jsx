/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

import { styled, lighten } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';

import theme from '../../../../../config/mui.config';
import Label from '../../../../../common/utilities/Label';

const StyledSelect = styled(MuiSelect)(({ statuscolor = '#000' }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '6px',
    textTransform: 'capitalize',
    backgroundColor: lighten(statuscolor, 0.95),
    transitionDuration: '350ms',
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${lighten(statuscolor, 0.8)}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${lighten(statuscolor, 0.2)}`,
    },
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  '&.MuiMenuItem-root': {
    ':hover': { backgroundColor: 'action.hover' },
  },
  '&.Mui-selected': { color: theme.palette.primary.main },
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

function ProjectStatusSelector({
  title,
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
      {title && (
        <MuiGrid xs={12} item>
          <Label title={title} />
        </MuiGrid>
      )}
      <MuiFormControl fullWidth>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <StyledSelect
            MenuProps={MenuProps}
            name="status"
            size="small"
            statuscolor={
              projectStatus.find((status) => status.id === value)?.color
            }
            sx={{
              height: variant === 'dense' ? '28px' : 'auto',
              '&:hover': {
                boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
              },
            }}
            value={value}
            onChange={handleChange}
          >
            {projectStatus.map(({ id, name, color }) => (
              <StyledMenuItem key={id} value={id}>
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
        )}
      </MuiFormControl>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" sx={{ fontSize: '13px' }}>
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </MuiGrid>
  );
}

export default ProjectStatusSelector;
