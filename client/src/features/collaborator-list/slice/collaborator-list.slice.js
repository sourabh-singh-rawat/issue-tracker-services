/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const collaboratorListSlice = createSlice({
  name: 'collaboratorList',
  initialState: {
    filters: [],
    page: 0,
    pageSize: 10,
    rowCount: 0,
    rows: [],
    isLoading: true,
  },
  reducers: {
    setCollaboratorList: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;

      return state;
    },
    updateCollaboratorList: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setCollaboratorList, updateCollaboratorList } =
  collaboratorListSlice.actions;
export default collaboratorListSlice.reducer;
