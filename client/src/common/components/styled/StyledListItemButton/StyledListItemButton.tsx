import { styled } from "@mui/material/styles";
import MuiListItemButton from "@mui/material/ListItemButton";

const StyledListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  backgroundColor: "transparent",
  "&.MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    padding: theme.spacing(1),
  },
  "&.MuiListItemButton-root:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    transition: theme.transitions.create(["color"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default StyledListItemButton;
