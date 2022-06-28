import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const memberListSlice = createSlice({
  name: "memberList",
  initialState,
  reducers: {
    setMemberList: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
    }),
    updateIssueList: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setMemberList, updateIssueList } = memberListSlice.actions;
export default memberListSlice.reducer;
