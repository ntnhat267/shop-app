import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: {},
  reviews: [1,2,3],
  isLoading: false,
  error: null,
  userName: "",
  email:"",
  phone: "",
  accessToken: "hi",
  address_city: "",
  address_district: "",
  address_wards: "",
  address_street: "", 
  isLoading: false,
  error: null
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // extraReducers: (buider) => {
  //   buider
  //     // .addCase(fetchDetailItem.pending, (state) => {
  //     //   state.isLoading = true;
  //     // })
  //     // .addCase(fetchDetailItem.rejected, (state, action) => {
  //     //   state.isLoading = false;
  //     //   state.error = action.error.message;
  //     // })
  //     // .addCase(fetchDetailItem.fulfilled, (state, action) => {
  //     //   state.isLoading = false;
  //     //   state.detail = action.payload.detail;
  //     // });
  // },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = itemSlice.actions;

export default itemSlice.reducer;
