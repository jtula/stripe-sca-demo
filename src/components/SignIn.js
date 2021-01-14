import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useUser from "src/hooks/useUser";
import { useEffect } from "react";

const SignIn = ({ onLogin }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loadingUser, userError, login, userLogged } = useUser();

  useEffect(() => {
    if (userLogged) {
      history.replace("/");
      onLogin && onLogin();
    }
  }, [userLogged, history, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      {loadingUser && <strong>Checking credentials...</strong>}
      {!loadingUser && (
        <div className="d-flex justify-content-center mt-5">
          <form className="form" onSubmit={handleSubmit}>
            <div
              className="card shadow-sm bg-white rounded p-3"
              style={{ maxWidth: "500px", width: "500px" }}
            >
              <div className="card-body">
                <label>
                  Username
                  <input
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </label>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {userError && "Credentials are invalid"}
    </>
  );
};

export default SignIn;
