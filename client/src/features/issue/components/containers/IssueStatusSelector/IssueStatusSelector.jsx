/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';

import { lighten, styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import Label from '../../../../../common/utilities/Label/Label';

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
              name="status"
              size="small"
              value={value}
              onChange={handleChange}
              statuscolor={
                issueStatus.find((status) => status.id === value)?.color
              }
              sx={{
                color: 'text.primary',
                fontSize: '13px',
                fontWeight: 500,
                height: variant === 'dense' ? '28px' : 'auto',
                textTransform: 'capitalize',
              }}
              displayEmpty
            >
              {issueStatus.map(({ id, name, color }) => (
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

export default IssueStatusSelector;
