import React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import MuiSelect from '@mui/material/Select';
import MuiFormControl from '@mui/material/FormControl';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiCheckbox from '@mui/material/Checkbox';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../config/mui.config';

const StyledSelect = styled(MuiSelect)(() => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'capitalize',
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[50],
    '& fieldset': {
      border: `2px solid ${theme.palette.grey[300]}`,
    },
    '&:hover fieldset': {
      border: `2px solid ${theme.palette.grey[600]}`,
      transitionDuration: '250ms',
      boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
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

export default function IssueStatusFilter() {
  const [priority, setPriority] = React.useState([]);
  const issueStatus = useSelector((store) => store.issue.options.status.rows);

  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  const renderValue = (selected) => {
    if (selected.length === 0) {
      return 'Status';
    }
    if (selected.length === 1) {
      return selected[0];
    }
    return `${selected[0]} +${selected.length - 1}`;
  };

  return (
    <MuiFormControl sx={{ minWidth: 150 }}>
      <StyledSelect
        MenuProps={MenuProps}
        renderValue={renderValue}
        size="small"
        value={priority}
        displayEmpty
        multiple
        onChange={handleChange}
      >
        {issueStatus.map(({ id, name }) => (
          <MuiMenuItem
            key={id}
            sx={{ height: '32px', padding: '0 8px' }}
            value={name}
            disableGutters
            disableRipple
          >
            <MuiCheckbox checked={priority.includes(name)} disableRipple />
            <MuiTypography fontWeight={600} variant="body2">
              {name}
            </MuiTypography>
          </MuiMenuItem>
        ))}
      </StyledSelect>
    </MuiFormControl>
  );
}
