import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activity: {},
  info: {
    nameSelected: false,
    descriptionSelected: false,
    status: "OPEN",
    priority: "0_LOWEST",
    loading: true,
  },
  options: {
    status: { loading: true, rows: [{ status: "0_OPEN", message: "open" }] },
    priority: {
      rows: [{ status: "0_LOWEST", message: "lowest" }],
      loading: true,
    },
  },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload, loading: false };

      return state;
    },
    setIssueStatus: (state, action) => {
      state.options.status.loading = false;
      state.options.status.rows = action.payload.rows;

      return state;
    },
    setIssuePriority: (state, action) => {
      state.options.priority.loading = false;
      state.options.priority.rows = action.payload.rows;

      return state;
    },
    updateIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload };
      return state;
    },
  },
});

export const { setIssue, setIssueStatus, setIssuePriority, updateIssue } =
  issueSlice.actions;
export default issueSlice.reducer;
