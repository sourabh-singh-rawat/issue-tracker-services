import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: [],
  loading: true,
};

const issueCommentsSlice = createSlice({
  name: "issueComments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      state.loading = false;

      return state;
    },
    setLoadingComments: (state, action) => {
      state.loading = true;
      return state;
    },
    clearComments: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setComments, setLoadingComments, clearComments } =
  issueCommentsSlice.actions;
export default issueCommentsSlice.reducer;
