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
  assigned_to: "",
  due_date: "",
  project_id: "",
  project_name: "",
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
