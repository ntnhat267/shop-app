import axios from "axios"

export const getCity = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=3")
    return res;
}

