import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const teamListSlice = createSlice({
  name: "teamList",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;

      return state;
    },
    updateList: (state, action) => {},
  },
});

export default teamListSlice.reducer;
export const { setList } = teamListSlice.actions;
