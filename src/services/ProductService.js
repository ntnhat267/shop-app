import apiClient from "./api";

export const createProduct = async (data) => {
  const res = await apiClient.post("products", data);
  return res;
};

export const getProductById = async (id) => {
  const res = await apiClient.get(`products/${id}`);
  return res;
};

export const getAllProduct = async (data) => {
  const res = await apiClient.get("products", {
    params: data,
  });
  return res;
};

export const addToWishList = async (data) => {
  const res = await apiClient.post("products/addToWishList", data);
  return res;
};

export const removeProductToWishList = async (data) => {
  const res = await apiClient.post("products/removeProductToWishList", data);
  return res;
};