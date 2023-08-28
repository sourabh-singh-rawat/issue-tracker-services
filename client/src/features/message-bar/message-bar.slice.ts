import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LogLevels } from "../../common/enums/log-level.enum";

const initialState = {
  message: "",
  isOpen: false,
  level: LogLevels.INFO,
};

const messageBarSlice = createSlice({
  name: "messageBar",
  initialState,
  reducers: {
    showMessage: (
      slice,
      action: PayloadAction<{ message: string; level?: LogLevels }>,
    ) => ({
      ...slice,
      message: action.payload.message,
      level: action.payload.level ? action.payload.level : slice.level,
      isOpen: true,
    }),
    hideMessage: (slice) => ({ ...slice, isOpen: false }),
  },
});

export const { showMessage, hideMessage } = messageBarSlice.actions;
export default messageBarSlice.reducer;
