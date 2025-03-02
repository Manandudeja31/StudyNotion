import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../services/operations/profileAPI";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;

// Async initialization function to fetch user details
export const initializeUserDetails = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const userDetails = await getUserData(token);
      dispatch(setUser(userDetails));
      dispatch(setLoading(false));
    }
  } catch (error) {
    // Handle error if necessary
    dispatch(setLoading(false));
  }
};
