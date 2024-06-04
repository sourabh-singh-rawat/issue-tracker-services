import { alpha, styled } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "100%",
    fontSize: theme.typography.body1.fontSize,
    position: "relative",
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&.Mui-focused": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      fieldset: { borderWidth: "2px" },
      "&.Mui-error": {
        boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
        "& fieldset": { borderWidth: "2px" },
      },
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
      "& fieldset": { borderWidth: "2px" },
    },
  },
  ".MuiFormHelperText-root": {
    fontSize: theme.typography.body1.fontSize,
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

export default StyledTextField;
