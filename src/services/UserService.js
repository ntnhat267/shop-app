import apiClient from "./api";

export const loginUser = async (data) => {
    const res = await apiClient.post("users/login", data );
    return res;
}

export const registerUser = async (data) => {
    const res = await apiClient.post("users/register", data );
    return res;
}

export const updateUser = async (id,data) => {
    const res = await apiClient.put(`users/${id}`, data );
    return res;
}

export const deleteUser = async (id) => {
    const res = await apiClient.delete(`users/${id}`);
    return res;
}

export const getDetailUser = async (id) => {
    const res = await apiClient.get(`users/${id}`);
    return res;
}

export const getAlllUser = async () => {
    const res = await apiClient.get(`users`);
    return res;
}