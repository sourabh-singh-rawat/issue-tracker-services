import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

const initialState = {
  message: "",
  isOpen: false,
  severity: "info",
};

const messageBarSlice = createSlice({
  name: "messageBar",
  initialState,
  reducers: {
    showMessage: (
      slice,
      action: PayloadAction<{
        message: string;
        severity: AlertColor;
      }>,
    ) => ({
      ...slice,
      message: action.payload.message,
      isOpen: true,
      severity: action.payload.severity,
    }),
    hideMessage: (slice) => ({ ...slice, isOpen: false }),
  },
});

export const { showMessage, hideMessage } = messageBarSlice.actions;
export default messageBarSlice.reducer;
