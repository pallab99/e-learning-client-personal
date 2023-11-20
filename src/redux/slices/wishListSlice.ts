import { createSlice } from '@reduxjs/toolkit';
interface WishListState {
  cnt: number;
}

const initialState: WishListState = {
  cnt: 0,
};
export const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    recallWishListApi: (state) => {
      state.cnt += 1;
    },
  },
});
export const { recallWishListApi } = wishListSlice.actions;

export default wishListSlice.reducer;
