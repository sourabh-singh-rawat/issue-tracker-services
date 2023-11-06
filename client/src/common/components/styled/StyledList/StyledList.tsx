import MuiList from "@mui/material/List";
import { styled } from "@mui/material/styles";

const StyledList = styled(MuiList)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  ".MuiButtonBase-root": {},
}));

export default StyledList;
