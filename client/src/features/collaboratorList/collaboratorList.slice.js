import { createSlice } from "@reduxjs/toolkit";

const collaboratorListSlice = createSlice({
  name: "collaboratorList",
  initialState: { filters: [], page: 0, pageSize: 10, rowCount: 0, rows: [] },
  reducers: {
    setCollaboratorList: (state, action) => {
      state.rows = action.payload.rows;
      return state;
    },
    updateCollaboratorList: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCollaboratorList, updateCollaboratorList } =
  collaboratorListSlice.actions;
export default collaboratorListSlice.reducer;
