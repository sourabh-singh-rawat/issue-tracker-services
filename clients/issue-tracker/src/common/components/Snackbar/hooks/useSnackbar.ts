import { enqueueSnackbar, SharedProps } from "notistack";
import { SnackbarAction } from "../components";

const options: SharedProps = {
  action: SnackbarAction,
};

export const useSnackbar = () => {
  return {
    showInfo: (message: string) => {
      enqueueSnackbar(message, { variant: "info", ...options });
    },
    showSuccess: (message: string) => {
      enqueueSnackbar(message, { variant: "success", ...options });
    },
    showWarning: (message: string) => {
      enqueueSnackbar(message, { variant: "warning", ...options });
    },
    showError: (message: string) => {
      enqueueSnackbar(message, { variant: "error", ...options });
    },
  };
};
