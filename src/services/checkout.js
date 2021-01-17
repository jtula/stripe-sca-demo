import axios from "src/utils/axios";

export const buy = (token, params) => {
  return axios
    .post("/checkout", params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response);
};

export const getCustomerCards = ({ token }) => {
  return axios
    .get("/checkout/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data.data);
};
