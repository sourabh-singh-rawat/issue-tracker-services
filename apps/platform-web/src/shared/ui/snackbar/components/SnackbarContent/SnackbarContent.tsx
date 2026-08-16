import { styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

export const SnackbarContent = styled(MaterialDesignContent)(({ theme }) => ({
  "&.notistack-MuiContent": {
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.01em",
    borderRadius: 8,
    minWidth: 288,
    maxWidth: 420,
    padding: "10px 14px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.14), 0 1px 3px rgba(15, 23, 42, 0.08)",
    flexWrap: "nowrap",
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: "#0f766e",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#b91c1c",
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: "#b45309",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: "#1e293b",
  },
  "&.notistack-MuiContent-default": {
    backgroundColor: "#1e293b",
  },
}));
