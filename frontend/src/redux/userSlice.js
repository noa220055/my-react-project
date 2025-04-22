import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Dispatched setUser with payload:", action.payload);
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.username = "";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
