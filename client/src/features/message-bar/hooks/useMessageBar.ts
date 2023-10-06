import { showMessage } from "../message-bar.slice";
import { useAppDispatch } from "../../../common/hooks";
import { AlertColor } from "@mui/material";

export const useMessageBar = () => {
  const dispatch = useAppDispatch();

  const show = (message: string, severity: AlertColor) => {
    dispatch(showMessage({ message, severity }));
  };

  return {
    showInfo: (message: string) => {
      show(message, "info");
    },
    showSuccess: (message: string) => {
      show(message, "success");
    },
    showWarning: (message: string) => {
      show(message, "warning");
    },
    showError: (message: string) => {
      show(message, "error");
    },
  };
};
