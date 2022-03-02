import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL;

const apiClient = axios.create({
  baseURL: `${url}/api/`,
});

export default apiClient;
