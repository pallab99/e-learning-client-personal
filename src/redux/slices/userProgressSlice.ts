import { createSlice } from '@reduxjs/toolkit';

interface IUserProgress {
  progress: number;
  boughtTheCourse: boolean;
}

const initialState: IUserProgress = {
  progress: 0,
  boughtTheCourse: false,
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    updateUerProgress: (state, action) => {
      state.progress = action.payload;
    },
    updateUerBoughtTheCourse: (state, action) => {
      state.boughtTheCourse = action.payload;
    },
  },
});

export const { updateUerProgress, updateUerBoughtTheCourse } =
  userProgressSlice.actions;

export default userProgressSlice.reducer;
