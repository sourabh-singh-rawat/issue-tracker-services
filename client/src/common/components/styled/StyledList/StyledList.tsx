import MuiList from "@mui/material/List";
import { styled } from "@mui/material/styles";

const StyledList = styled(MuiList)(({ theme }) => ({
  ".MuiButtonBase-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.text.primary,
  },
}));

export default StyledList;
