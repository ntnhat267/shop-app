import apiClient from "./api";

export const getAllOrder = async (id) => {
    const res = await apiClient.get(`orders/get-all-order/${id}`)
    return res;
}

export const GetDetailsOrderById = async (id) => {
    const res = await apiClient.get(`orders/get-details-order/${id}`)
    return res;
}

export const createOrderService = async (data) => {
    const res = await apiClient.post(`orders/create`, data)
    return res;
}