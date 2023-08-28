import { showMessage } from "../message-bar.slice";
import { userAppDispatch } from "../../../common/hooks";
import { LogLevels } from "../../../common/enums/log-level.enum";

export default function useMessageBar() {
  const dispatch = userAppDispatch();

  const dispatchMessage = (message: string, level: LogLevels) => {
    dispatch(showMessage({ message, level }));
  };

  return {
    showInfo: (message: string) => {
      dispatchMessage(message, LogLevels.INFO);
    },
    showSuccess: (message: string) => {
      dispatchMessage(message, LogLevels.SUCCESS);
    },
    showError: (message: string) => {
      dispatchMessage(message, LogLevels.ERROR);
    },
    showWarning: (message: string) => {
      dispatchMessage(message, LogLevels.WARN);
    },
  };
}
