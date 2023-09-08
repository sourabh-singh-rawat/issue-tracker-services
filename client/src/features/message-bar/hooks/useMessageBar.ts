import { showMessage } from "../message-bar.slice";
import { useAppDispatch } from "../../../common/hooks";
import { LogLevels } from "../../../common/enums/log-level.enum";

export const useMessageBar = () => {
  const dispatch = useAppDispatch();

  const show = (message: string, level: LogLevels) => {
    dispatch(showMessage({ message, level }));
  };

  return {
    showInfo: (message: string) => {
      show(message, LogLevels.INFO);
    },
    showSuccess: (message: string) => {
      show(message, LogLevels.SUCCESS);
    },
    showError: (message: string) => {
      show(message, LogLevels.ERROR);
    },
    showWarning: (message: string) => {
      show(message, LogLevels.WARN);
    },
  };
};
