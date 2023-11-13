import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../../types/userData";
interface AuthState {
  userData: IUserData;
}

const initialState: AuthState = {
  userData: {} as IUserData,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.userData = {
        id: "",
        email: "",
        name: "",
        phoneNumber: "",
        rank: 0,
        accessToken: "",
        refreshToken: "",
      };
    },
  },
});
export const { addUserData, logOut } = authSlice.actions;

export default authSlice.reducer;
