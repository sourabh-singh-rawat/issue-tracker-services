import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const projectListReducer = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    setProjectList: (state, action) => ({
      ...state,
      rows: action.payload.data,
      rowCount: action.payload.rowCount,
    }),
    updateProjectList: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setProjectList, updateProjectList } = projectListReducer.actions;
export default projectListReducer.reducer;
