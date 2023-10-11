import { alpha, styled } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    position: "relative",
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.divider,
    width: "100%",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&.Mui-focused": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-error": {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
    },
  },
  ".MuiFormHelperText-root": {
    fontSize: theme.typography.body1,
    marginLeft: 0,
  },
}));

export default StyledTextField;
