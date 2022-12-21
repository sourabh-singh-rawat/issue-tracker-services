import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
  filters: [],
  isLoading: true,
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
    updateProjectList: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLoadingProjectList: (state) => {
      state.isLoading = true;
      return state;
    },
    resetProjectListSlice: () => initialState,
  },
});

export const {
  setProjectList,
  updateProjectList,
  setLoadingProjectList,
  restProjectListSlice,
} = projectListSlice.actions;
export default projectListSlice.reducer;
