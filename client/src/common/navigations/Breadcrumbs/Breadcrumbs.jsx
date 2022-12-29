/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MuiKeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Breadcrumbs({ items, isLoading }) {
  const theme = useTheme();

  return (
    <MuiBreadcrumbs
      separator={
        <MuiKeyboardArrowRightIcon sx={{ color: theme.palette.grey[400] }} />
      }
    >
      {items.map(({ text, onClick }) => (
        <span key={onClick}>
          {isLoading ? (
            <MuiSkeleton height="20px" variant="text" width="75px" />
          ) : (
            <MuiLink
              sx={{
                cursor: 'pointer',
                color: theme.palette.grey[700],
              }}
              underline="hover"
              onClick={onClick}
            >
              <MuiTypography
                sx={{
                  fontWeight: 500,
                  ':hover': { color: 'text.main' },
                }}
                variant="body2"
              >
                {text}
              </MuiTypography>
            </MuiLink>
          )}
        </span>
      ))}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
