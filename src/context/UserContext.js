import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    window.sessionStorage.getItem("accessToken")
  );

  return (
    <Context.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
