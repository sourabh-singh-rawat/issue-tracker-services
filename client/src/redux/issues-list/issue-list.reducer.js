import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [],
  count: 0,
};

const issueListSlice = createSlice({
  name: "issueList",
  initialState,
  reducers: {
    // case reducers
    setIssueList: (state, action) => ({
      ...state,
      issues: action.payload,
      count: action.payload.length,
    }),
  },
});

export const { setIssueList } = issueListSlice.actions;
export default issueListSlice.reducer;
