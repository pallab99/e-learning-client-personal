import { createSlice } from '@reduxjs/toolkit';

interface ICourseState {
  searchTerm?: string;
  category?: string[];
  level?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const initialState: ICourseState = {
  searchTerm: '',
  category: [],
  level: '',
  sort: '',
  page: 1,
  limit: 10,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    filterByLevel: (state, action) => {
      state.level = action.payload;
    },
    courseSortProperty: (state, action) => {
      state.sort = action.payload;
    },
    courseSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    handleCoursePagination(state, action) {
      state.page = action.payload.page;
      state.limit = action.payload.pageSize;
    },
    handleCourseFilterByCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const {
  filterByLevel,
  courseSortProperty,
  courseSearchTerm,
  handleCoursePagination,
  handleCourseFilterByCategory,
} = courseSlice.actions;

export default courseSlice.reducer;
