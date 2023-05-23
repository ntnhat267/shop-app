import apiClient from "./api";

export const getAllCategory = async (data) => {
    const res = await apiClient.get("categories")
    return res;
}