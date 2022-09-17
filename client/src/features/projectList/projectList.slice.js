import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
  filters: [],
};

const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    setProjectList: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      return state;
    },
    updateProjectList: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setProjectList, updateProjectList } = projectListSlice.actions;
export default projectListSlice.reducer;
