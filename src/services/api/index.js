import axios from "axios";
const apiClient = axios.create({
  // baseURL: "http:// 192.168.1.3:3001/api",
  baseURL: "http://192.168.43.76:3001/api",
});
export default apiClient;
