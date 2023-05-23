import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/item/itemSlice'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    item: itemReducer,
    user: userReducer,
    product: productReducer,
  });

export const store = configureStore({
  reducer: rootReducer
})