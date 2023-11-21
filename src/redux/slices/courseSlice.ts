import { createSlice } from '@reduxjs/toolkit';

interface ICourseState {
  searchTerm?: string;
  category?: string[];
  level?: string;
  sort?: string;
}

const initialState: ICourseState = {
  searchTerm: '',
  category: [],
  level: '',
  sort: '',
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    filterByLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { filterByLevel } = courseSlice.actions;

export default courseSlice.reducer;
