import { Typography, TextField } from "@mui/material";

const StyledTextField = ({ title, name, ...otherProps }) => {
  return (
    <>
      <Typography variant="body2" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {title}
      </Typography>
      <TextField
        name={name.toLowerCase()}
        size="small"
        sx={{
          paddingBottom: 2,
          fontSize: "14px",
          "& .MuiOutlinedInput-input": {
            fontSize: "14px",
          },
          "& .MuiFormHelperText-contained": {
            marginLeft: 0,
            fontSize: "14px",
          },
        }}
        fullWidth
        {...otherProps}
      />
    </>
  );
};

export default StyledTextField;
