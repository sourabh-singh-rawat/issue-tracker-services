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
      const { rows, rowCount } = action.payload;

      return { ...state, rows, rowCount };
    },
    // updateList: () => {},
  },
});

export default teamListSlice.reducer;
export const { setList } = teamListSlice.actions;
