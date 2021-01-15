import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() =>
    JSON.parse(window.sessionStorage.getItem("token"))
  );
  const [user, setUser] = useState(() =>
    JSON.parse(window.sessionStorage.getItem("user"))
  );

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
