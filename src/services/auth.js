import axios from "src/utils/axios";

export const login = (params) => {
  return axios.post("/auth/login", params).then((response) => response.data);
};

export const register = (params) => {
  return axios.post("/auth/register", params).then((response) => response.data);
};
