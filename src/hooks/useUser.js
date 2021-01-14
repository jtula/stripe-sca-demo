import { useCallback, useContext, useState } from "react";
import Context from "context/UserContext";
import { login } from "services/auth";

export default function useUser() {
  const { accessToken, setAccessToken } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });

  const userLogin = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false });
      login({ username, password })
        .then((accessToken) => {
          window.sessionStorage.setItem("accessToken", accessToken);
          setState({ loading: false, error: false });
          setAccessToken(accessToken);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("accessToken");
          setState({ loading: false, error: true });
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
    isLogged: Boolean(accessToken),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    userLogin,
    logout,
  };
}
