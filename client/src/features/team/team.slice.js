import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    current: null,
    list: {
      rows: [],
      rowCount: 0,
      page: 0,
      pageSize: 10,
    },
    options: {},
  },
  reducers: {
    setCurrent: (state, action) => ({
      ...state,
      current: { ...action.payload },
    }),
    updateCurrent: (state, action) => ({
      ...state,
      current: { ...action.payload },
    }),

    setList: (state, action) => ({
      ...state,
      list: {
        rows: action.payload.rows,
        rowCount: action.payload.rowCount,
      },
    }),
    updateList: () => {},
  },
});

export const { setCurrent, updateCurrent, setList, updateList } =
  teamSlice.actions;
export default teamSlice.reducer;
