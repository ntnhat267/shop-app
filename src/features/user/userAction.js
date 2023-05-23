import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/UserService";
import { addToWishList } from "../../services/ProductService";
import { createOrderService } from "../../services/OrderService";

export const fetchLoginUser = createAsyncThunk(
  "user/fetchLoginUser",
  async (data) => {
    const res = await loginUser(data);
    return res.data;
  }
);

export const AddToWishListAction = createAsyncThunk(
  "product/AddToWishListAction",
  async (data) => {
    const res = await addToWishList(data);
    return res.data;
  }
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (data) => {
    const res = await createOrderService(data);
    return res.data;
  }
);
