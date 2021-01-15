import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers,
});

export default instance;
