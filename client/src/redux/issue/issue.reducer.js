import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  nameSelected: false,
  previousName: "",
  description: "",
  descriptionSelected: false,
  status: "",
  priority: "",
  reporter: "",
  assignee: "",
  dueDate: "",
  projectId: "",
  projectName: "",
  projectOwnerUid: "",
};

const issueReducer = createSlice({
  name: "currentIssue",
  initialState,
  reducers: {
    // case reducers
    setIssue: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateIssue: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setIssue, updateIssue } = issueReducer.actions;
export default issueReducer.reducer;
