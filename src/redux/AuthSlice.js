import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
