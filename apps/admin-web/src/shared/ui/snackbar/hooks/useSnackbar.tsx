import { enqueueSnackbar, type OptionsObject, type VariantType } from "notistack";
import { SnackbarAction } from "../components";

const baseOptions: OptionsObject = {
  action: (snackbarId) => <SnackbarAction snackbarId={snackbarId} />,
};

function show(message: string, variant: VariantType, options?: OptionsObject) {
  enqueueSnackbar(message, { variant, ...baseOptions, ...options });
}

export const useSnackbar = () => {
  return {
    info: (message: string, options?: OptionsObject) => {
      show(message, "info", options);
    },
    success: (message: string, options?: OptionsObject) => {
      show(message, "success", options);
    },
    warning: (message: string, options?: OptionsObject) => {
      show(message, "warning", options);
    },
    error: (message: string, options?: OptionsObject) => {
      show(message, "error", options);
    },
  };
};
