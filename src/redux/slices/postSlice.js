import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPostData: null,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setUserPostData(state, value) {
      state.userPostData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUserPostData, setLoading } = postSlice.actions;
export default postSlice.reducer;
