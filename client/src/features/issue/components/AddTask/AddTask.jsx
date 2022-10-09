import MuiTextField from "@mui/material/TextField";
import MuiAddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";

export default function AddTask() {
  return (
    <MuiTextField
      fullWidth
      size="small"
      placeholder="Add a Task"
      sx={{
        input: { fontSize: "14px" },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MuiAddIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
