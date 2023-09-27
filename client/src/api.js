import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
});
instance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("token");
    if (auth) {
      config.headers = {
        "x-access-token": `${auth}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
