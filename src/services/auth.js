const ENDPOINT = "https://xxxx.herokuapp.com";

const login = ({ username, password }) => {
  return fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response);
};

const register = ({ username, password }) => {
  return fetch(`${ENDPOINT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response);
};
