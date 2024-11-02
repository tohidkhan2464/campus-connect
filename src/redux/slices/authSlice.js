import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  },
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  accessToken: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null,
  otherUsersData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setOtherUsersData(state, value) {
      state.otherUsersData = value.payload;
    },
    setAccessToken(state, value) {
      state.accessToken = value.payload;
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setOtherUsersData,
  setAccessToken,
} = authSlice.actions;
export default authSlice.reducer;
