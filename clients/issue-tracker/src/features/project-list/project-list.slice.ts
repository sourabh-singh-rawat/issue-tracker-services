import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  filteredRowCount: 0,
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
      const { rows, rowCount, filteredRowCount } = action.payload;

      return {
        ...state,
        rows,
        rowCount,
        filteredRowCount,
        isLoading: false,
      };
    },
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
