import MuiTypography from "@mui/material/Typography";

const Label = ({ title, error }) => {
  return (
    <MuiTypography
      variant="body2"
      sx={{
        color: "primary.main",
        color: error && "error.main",
        fontWeight: 500,
        paddingBottom: 1,
      }}
    >
      {title}
    </MuiTypography>
  );
};

export default Label;
