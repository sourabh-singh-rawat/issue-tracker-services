import { enqueueSnackbar, SharedProps } from "notistack";
import { SnackbarAction } from "../components";

const options: SharedProps = {
  action: SnackbarAction,
};

export const useSnackbar = () => {
  return {
    info: (message: string) => {
      enqueueSnackbar(message, { variant: "info", ...options });
    },
    success: (message: string) => {
      enqueueSnackbar(message, { variant: "success", ...options });
    },
    warning: (message: string) => {
      enqueueSnackbar(message, { variant: "warning", ...options });
    },
    error: (message: string) => {
      enqueueSnackbar(message, { variant: "error", ...options });
    },
  };
};
