import { useTheme } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";

const Label = ({ title, error }) => {
  const theme = useTheme();

  return (
    <MuiTypography
      variant="body2"
      sx={{
        color: error ? "error.main" : theme.palette.grey[700],
        fontWeight: 500,
        paddingBottom: 1,
      }}
    >
      {title}
    </MuiTypography>
  );
};

export default Label;
