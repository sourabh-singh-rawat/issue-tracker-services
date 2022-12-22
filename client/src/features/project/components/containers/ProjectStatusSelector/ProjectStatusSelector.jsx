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

import Label from '../../../../../common/utilities/Label';

const StyledSelect = styled(MuiSelect)(({ theme, statuscolor = '#000' }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'capitalize',
    borderRadius: '6px',
    backgroundColor: lighten(statuscolor, 0.95),
    '& fieldset': {
      border: `1px solid ${lighten(statuscolor, 0.85)}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `1px solid ${lighten(statuscolor, 0.2)}`,
      transitionDuration: '250ms',
    },
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  '&.MuiMenuItem-root': {
    ':hover': {
      backgroundColor: 'action.hover',
    },
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

function ProjectStatusSelector({
  title,
  helperText,
  value,
  handleChange,
  variant,
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
        <MuiGrid item xs={12}>
          <Label title={title} />
        </MuiGrid>
      )}
      <MuiFormControl fullWidth>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <StyledSelect
            name="status"
            size="small"
            value={value}
            onChange={handleChange}
            statuscolor={
              projectStatus.find((status) => status.id === value)?.color
            }
            sx={{
              height: variant === 'dense' ? '28px' : 'auto',
            }}
          >
            {projectStatus.map(({ id, name, color }) => (
              <StyledMenuItem key={id} value={id}>
                <MuiTypography
                  variant="body2"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  sx={{
                    color,
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
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
