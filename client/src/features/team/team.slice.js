import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    info: {},
    options: {},
  },
  reducers: {
    setTeam: (state, action) => ({
      ...state,
      info: { ...action.payload },
    }),
    updateTeam: (state, action) => ({
      ...state,
      info: { ...action.payload },
    }),
  },
});

export const { setTeam, updateTeam, updateList } = teamSlice.actions;
export default teamSlice.reducer;
