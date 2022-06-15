import { Typography, TextField } from "@mui/material";

const StyledTextField = ({ name, ...otherProps }) => {
  return (
    <>
      <Typography variant="body1" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {name}
      </Typography>
      <TextField
        fullWidth
        required
        {...otherProps}
        sx={{
          paddingBottom: 2,
          "& .MuiFormHelperText-contained": {
            marginLeft: 0,
          },
        }}
      />
    </>
  );
};

export default StyledTextField;
