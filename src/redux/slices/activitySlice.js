import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  usersData: null,
};

const activitySlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setUsersData(state, value) {
      state.usersData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUsersData, setLoading } = activitySlice.actions;
export default activitySlice.reducer;
