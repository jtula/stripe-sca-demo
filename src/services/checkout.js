import axios from "src/utils/axios";

export const buy = ({ paymentMethodId, amount, token }) => {
  return axios
    .post(
      "/checkout",
      { paymentMethodId, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
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
    .then((response) => response);
};
