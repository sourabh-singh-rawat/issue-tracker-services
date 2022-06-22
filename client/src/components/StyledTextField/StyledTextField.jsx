import { Typography, TextField } from "@mui/material";

const StyledTextField = ({ title, name, ...otherProps }) => {
  return (
    <>
      <Typography variant="body1" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {title}
      </Typography>
      <TextField
        name={name.toLowerCase()}
        size="small"
        sx={{
          paddingBottom: 2,
          ".MuiOutlinedInput-input": {},
          ".MuiFormHelperText-contained": {
            fontSize: "14px",
            marginLeft: 0,
          },
        }}
        fullWidth
        {...otherProps}
      />
    </>
  );
};

export default StyledTextField;
