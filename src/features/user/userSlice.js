import { createSlice } from "@reduxjs/toolkit";
import { AddToWishListAction, fetchLoginUser } from "./userAction";

const initialState = {
  data: {},
  userName: "",
  email: "",
  phone: "",
  accessToken: "",
  address_city: "",
  address_district: "",
  address_wards: "",
  address_street: "",
  isLoading: false,
  error: null,
  success: false,
  status: null,
  message: null,
  isAddToWishListSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    logutUser: (state) => {
      state.data = {};
      state.accessToken = "";
    },
    updateUserRedux: (state, action) => {
      state.data = action.payload.data;
    },
    setIsAddToWishListSuccess: (state) => {
      state.isAddToWishListSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.accessToken = action.payload.access_token;
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      .addCase(AddToWishListAction.fulfilled, (state, action) => {
        state.isAddToWishListSuccess = true;
      });
      
  },
});
export const {
  resetSuccess,
  logutUser,
  updateUserRedux,
  setIsAddToWishListSuccess,
} = userSlice.actions;

export default userSlice.reducer;
