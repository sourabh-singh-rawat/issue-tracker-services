/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useTheme } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

function Label({ title, error }) {
  const theme = useTheme();

  return (
    <MuiTypography
      variant="body2"
      sx={{
        color: error ? 'error.main' : theme.palette.grey[600],
        fontWeight: 600,
        paddingBottom: 1,
        // // textTransform: "uppercase",
        // // fontSize: "12px",
      }}
    >
      {title}
    </MuiTypography>
  );
}

export default Label;
