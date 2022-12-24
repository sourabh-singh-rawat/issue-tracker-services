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
import theme from '../../../../../config/mui.config';
import Label from '../../../../../common/utilities/Label/Label';

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
                color: theme.palette.text.primary,
                height: variant === 'dense' ? '28px' : 'auto',
                fontSize: '13px',
                textTransform: 'capitalize',
                '&:hover': {
                  boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
                },
              }}
              displayEmpty
            >
              {issuePriority.map(({ id, name }) => (
                <MuiMenuItem
                  key={id}
                  value={id}
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: '13px',
                    fontWeight: 600,
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
