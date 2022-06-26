import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const teamListSlice = createSlice({
  name: "teamList",
  initialState,
  reducers: {
    setTeamList: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
    }),
    updateTeamList: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setTeamList, updateTeamList } = teamListSlice.actions;
export default teamListSlice.reducer;
