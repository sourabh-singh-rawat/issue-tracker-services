import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issueStatus: [{ code: 0, message: "to do" }],
  issuePriority: [{ code: 0, message: "lowest" }],
};

const issueOptionsSlice = createSlice({
  name: "issueOptions",
  initialState,
  reducers: {
    setIssueStatus: (state, action) => {
      return { ...state, issueStatus: action.payload };
    },
    setIssuePriority: (state, action) => {
      return { ...state, issuePriority: action.payload };
    },
  },
});

export const { setIssueStatus, setIssuePriority } = issueOptionsSlice.actions;
export default issueOptionsSlice.reducer;
