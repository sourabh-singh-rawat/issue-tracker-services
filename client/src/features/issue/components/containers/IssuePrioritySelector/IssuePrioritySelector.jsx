/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

import { styled } from '@mui/material';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import Label from '../../../../../common/utilities/Label/Label';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.grey[700],
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[50],
    '& fieldset': {
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.grey[600]}`,
      transitionDuration: '250ms',
    },
  },
}));

function IssuePrioritySelector({
  title,
  value,
  variant,
  helperText,
  handleChange,
  isLoading,
}) {
  const issuePriority = useSelector(
    (store) => store.issue.options.priority.rows,
  );

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {isLoading ? <MuiSkeleton width="20%" /> : <Label title={title} />}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <MuiFormControl fullWidth>
            <StyledSelect
              name="priority"
              size="small"
              value={value}
              onChange={handleChange}
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'capitalize',
                height: variant === 'dense' ? '28px' : 'auto',
              }}
              displayEmpty
            >
              {issuePriority.map(({ id, name }) => (
                <MuiMenuItem
                  key={id}
                  value={id}
                  sx={{
                    color: 'text.primary',
                    fontSize: '13px',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}
                >
                  {name}
                </MuiMenuItem>
              ))}
            </StyledSelect>
          </MuiFormControl>
        )}
      </MuiGrid>
      {helperText && (
        <MuiGrid item xs={12}>
          {isLoading ? (
            <MuiSkeleton width="50%" height="75%" />
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
