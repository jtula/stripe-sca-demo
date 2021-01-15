import { useCallback, useContext, useState } from "react";
import Context from "src/context/UserContext";
import { login } from "src/services/auth";

export default function useUser() {
  const { token, setToken, user, setUser } = useContext(Context);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState(false);

  const loginUser = useCallback(
    ({ email, password }) => {
      setLoadingUser(true);
      login({ email, password })
        .then((response) => {
          window.sessionStorage.setItem("user", JSON.stringify(response.user));
          window.sessionStorage.setItem(
            "token",
            JSON.stringify(response.token)
          );
          setLoadingUser(false);
          setUserError(false);
          setUser(response.user);
          setToken(response.token);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("user");
          window.sessionStorage.removeItem("token");
          setLoadingUser(false);
          setUserError(true);
        });
    },
    [setUser, setToken]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, [setUser, setToken]);

  return {
    userLogged: Boolean(token),
    user,
    loadingUser,
    userError,
    loginUser,
    logout,
  };
}
