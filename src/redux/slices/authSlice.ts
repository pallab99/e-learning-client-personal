import { createSlice } from '@reduxjs/toolkit';
import { IUserLoginData } from '../../types/userData';
interface AuthState {
  userData: IUserLoginData;
  cnt: number;
  showTourButton: boolean;
}

const initialState: AuthState = {
  userData: {} as IUserLoginData,
  showTourButton: true,
  cnt: 0,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.userData = {} as IUserLoginData;
    },
    recallUserApi: (state) => {
      state.cnt += 1;
    },
    showTour: (state, action) => {
      state.showTourButton = action.payload;
    },
  },
});
export const { addUserData, logOut, recallUserApi, showTour } =
  authSlice.actions;

export default authSlice.reducer;
