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
    setProjectList: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
      isLoading: false,
    }),
    updateProjectList: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setLoadingProjectList: (state) => ({ ...state, isLoading: true }),
    resetProjectListSlice: () => initialState,
  },
});

export const { setProjectList, updateProjectList, setLoadingProjectList } =
  projectListSlice.actions;
export default projectListSlice.reducer;
