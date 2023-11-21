import { createSlice } from "@reduxjs/toolkit";

interface instructorSearchState {
  searchTerm: string;
}

const initialState: instructorSearchState = {
  searchTerm: "",
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    instructorCourseSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { instructorCourseSearchTerm } = instructorSlice.actions;

export default instructorSlice.reducer;
