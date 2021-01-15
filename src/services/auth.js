const ENDPOINT = "https://apistripetest.herokuapp.com";

export const login = ({ email, password }) => {
  return fetch(`${ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
};

export const register = ({ fullName, email, password }) => {
  return fetch(`${ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password }),
  }).then((response) => response.json());
};
