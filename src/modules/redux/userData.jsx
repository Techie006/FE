import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
      member_id : 1,
      nickname : "",
      profile_img :""
  },

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state, action) => {
        state.userData = {...action}
    },
  },
});

export const { user } = userSlice.actions;
export default userSlice.reducer;
