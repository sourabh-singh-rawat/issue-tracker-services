import { styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

export const SnackbarContent = styled(MaterialDesignContent)(({ theme }) => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.success.dark,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.dark,
  },
}));
