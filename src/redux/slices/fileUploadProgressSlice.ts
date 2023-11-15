//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {},
  reducers: {
    setProgress: (state, action) => {
      const { fileId, progress } = action.payload;
      state[fileId] = progress;
    },
  },
});

export const { setProgress } = uploadSlice.actions;
export default uploadSlice.reducer;
