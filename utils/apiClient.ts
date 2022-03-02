import axios from "axios";

const url = process.env.APP_URL;

const apiClient = axios.create({
  baseURL: `${url}/api/`,
});

export default apiClient;
