import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  count: 0,
};

const projectListReducer = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    setProjectList: (state, action) => ({
      ...state,
      projects: action.payload,
      count: action.payload.length,
    }),
  },
});

export const { setProjectList } = projectListReducer.actions;
export default projectListReducer.reducer;
