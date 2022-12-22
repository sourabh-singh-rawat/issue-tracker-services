/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

function Breadcrumbs({ items, isLoading }) {
  const theme = useTheme();

  return (
    <MuiBreadcrumbs separator="/">
      {items.map(({ text, onClick }) => (
        <span key={onClick}>
          {isLoading ? (
            <MuiSkeleton variant="text" width="75px" height="20px" />
          ) : (
            <MuiLink
              onClick={onClick}
              underline="hover"
              sx={{
                cursor: 'pointer',
                color: theme.palette.grey[700],
              }}
            >
              <MuiTypography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  ':hover': { color: 'text.main' },
                }}
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
