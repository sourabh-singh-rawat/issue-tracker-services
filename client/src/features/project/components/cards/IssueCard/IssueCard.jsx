/* eslint-disable object-curly-newline */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */

import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiPestControlIcon from '@mui/icons-material/PestControl';
import theme from '../../../../../config/mui.config';

function IssueCard({ title, count, color, backgroundColor, isLoading }) {
  return (
    <>
      {isLoading ? (
        <MuiSkeleton
          height="90px"
          sx={{ borderRadius: '6px' }}
          variant="rectangular"
        />
      ) : (
        <MuiGrid
          sx={{
            cursor: 'pointer',
            border: `2px solid ${backgroundColor || theme.palette.grey[200]}`,
            padding: '16px',
            minHeight: '60px',
            transition: '250ms',
            borderRadius: '1vh',
            backgroundColor: backgroundColor || theme.palette.common.white,
            ':hover': {
              backgroundColor: backgroundColor
                ? theme.palette.primary.dark
                : theme.palette.grey[100],
              border: `2px solid ${
                backgroundColor
                  ? theme.palette.primary.dark
                  : theme.palette.grey[100]
              }`,
              boxShadow: `0 1px 7px 0 ${theme.palette.grey[400]}`,
            },
          }}
          container
        >
          <MuiGrid display="flex" xs={12} item>
            <MuiTypography
              fontWeight={600}
              sx={{
                color: color || theme.palette.text.primary,
                opacity: 0.6,
                textTransform: 'capitalize',
                flexGrow: 1,
              }}
              variant="body2"
            >
              {title}
            </MuiTypography>
            <MuiPestControlIcon
              sx={{
                opacity: color ? 0.6 : 0.2,
                color: color || theme.palette.text.primary,
              }}
            />
          </MuiGrid>
          <MuiGrid xs={12} item>
            <MuiTypography
              sx={{
                fontFamily: 'Roboto Mono',
                fontWeight: 500,
                color: color || theme.palette.text.primary,
              }}
              variant="h4"
            >
              {count}
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      )}
    </>
  );
}

export default IssueCard;
