import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
  rowCount: [],
  isLoading: true,
};

const issueCommentsSlice = createSlice({
  name: 'issueComments',
  initialState,
  reducers: {
    setComments: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
      isLoading: false,
    }),
    setLoadingComments: (state) => ({ ...state, isLoading: true }),
  },
});

export const { setComments, setLoadingComments } = issueCommentsSlice.actions;
export default issueCommentsSlice.reducer;
