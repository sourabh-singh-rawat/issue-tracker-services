/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiAvatar from '@mui/material/Avatar';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import theme from '../../../config/mui.config';
import Label from '../../utilities/Label';

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
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

function IssueAssigneeSelector({
  title,
  value,
  isLoading,
  handleChange,
  projectMembers,
}) {
  return (
    <>
      {isLoading ? (
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MuiSkeleton />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiFormControl>
          {title && <Label title={title} />}
          <StyledSelect
            size="small"
            name="assigneeId"
            value={!value ? 0 : value}
            onChange={handleChange}
            sx={{
              '&:hover': {
                boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
              },
            }}
          >
            {projectMembers.map(({ name, memberId, photoUrl }) => (
              <MuiMenuItem
                key={memberId}
                value={memberId}
                sx={{ fontSize: '13px', fontWeight: 600 }}
              >
                <MuiGrid container columnSpacing={1}>
                  <MuiGrid item>
                    <MuiAvatar
                      sx={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: theme.palette.grey[500],
                      }}
                      src={photoUrl}
                    />
                  </MuiGrid>
                  <MuiGrid item sx={{ color: theme.palette.grey[700] }}>
                    {name}
                  </MuiGrid>
                </MuiGrid>
              </MuiMenuItem>
            ))}
            <MuiMenuItem value={0}>
              <MuiGrid
                container
                columnSpacing={1}
                sx={{ alignItems: 'center' }}
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
                    variant="body2"
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: theme.palette.grey[700],
                    }}
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
