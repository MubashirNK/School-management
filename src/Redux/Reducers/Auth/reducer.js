import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  accessToken: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserDetails(state, action) {
      const { email, role, accessToken, name } = action.payload;

      state.accessToken = accessToken;
      state.name = name;
      state.email = email;
      state.role = role;
    },
  },
});

export const { updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
