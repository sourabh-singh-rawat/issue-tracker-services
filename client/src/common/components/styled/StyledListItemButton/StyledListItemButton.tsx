import { styled } from "@mui/material/styles";
import MuiListItemButton from "@mui/material/ListItemButton";

const StyledListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadiusMedium,
  },
  "&.MuiListItemButton-root:hover": {
    backgroundColor: theme.palette.action.hover,
    transition: theme.transitions.create(["color"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default StyledListItemButton;
