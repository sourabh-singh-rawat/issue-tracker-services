import { Typography, TextField } from "@mui/material";

const StyledTextField = ({ title, name, ...otherProps }) => {
  return (
    <>
      <Typography variant="body1" fontWeight="bold" sx={{ paddingBottom: 1 }}>
        {title}
      </Typography>
      <TextField
        name={name && name.toLowerCase()}
        size="small"
        sx={{
          paddingBottom: 2,
          ".MuiOutlinedInput-root": { borderRadius: 2 },
          ".MuiFormHelperText-contained": { fontSize: "14px", marginLeft: 0 },
        }}
        {...otherProps}
        fullWidth
      />
    </>
  );
};

export default StyledTextField;
