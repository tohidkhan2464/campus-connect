import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: null,
  searchData: localStorage.getItem("searchData")
    ? JSON.parse(localStorage.getItem("searchData"))
    : [],
  requestSent: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setUsersData(state, value) {
      state.usersData = value.payload;
    },
   
    setSearchData(state, value) {
      state.searchData = value.payload;
    },
    setRequestSent(state, value) {
      state.requestSent = value.payload;
    },
  },
});

export const { setUsersData, setSearchData, setRequestSent } =
  activitySlice.actions;
export default activitySlice.reducer;
