import { useCallback, useContext, useState } from "react";
import UserContext from "src/context/UserContext";
import { login as loginService } from "src/services/auth";

export default function useUser() {
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState(false);

  const login = useCallback(
    ({ username, password }) => {
      setLoadingUser(true);
      loginService({ username, password })
        .then((accessToken) => {
          window.sessionStorage.setItem("accessToken", accessToken);
          setLoadingUser(false);
          setUserError(false);
          setAccessToken(accessToken);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("accessToken");
          setLoadingUser(false);
          setUserError(true);
          console.error(err);
        });
    },
    [setAccessToken]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("accessToken");
    setAccessToken(null);
  }, [setAccessToken]);

  return {
    userLogged: Boolean(accessToken),
    loadingUser,
    userError,
    login,
    logout,
  };
}
