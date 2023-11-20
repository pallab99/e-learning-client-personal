import { createSlice } from "@reduxjs/toolkit";
interface CartState {
  cnt: number;
}

const initialState: CartState = {
  cnt: 0,
};
export const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    recallCartApi: (state) => {
      state.cnt += 1;
    },
  },
});
export const { recallCartApi } = cartSlice.actions;

export default cartSlice.reducer;
