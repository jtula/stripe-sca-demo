import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import useUser from "src/hooks/useUser";
import { useEffect } from "react";

const SignIn = ({ onLogin }) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogged, loadingUser, userError, loginUser } = useUser();

  useEffect(() => {
    if (userLogged) {
      history.replace("/");
      onLogin && onLogin();
    }
  }, [userLogged, history, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <>
      {!loadingUser && (
        <div className="d-flex justify-content-center mt-5">
          <form className="form" onSubmit={handleSubmit}>
            <div
              className="card shadow-sm bg-white rounded p-3"
              style={{ maxWidth: "500px", width: "500px" }}
            >
              <div className="card-body">
                <label>
                  Email
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                >
                  {submitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Login"
                  )}
                </button>
                {userError && "Credentials are invalid"}
                <div className="d-flex justify-content-end pt-4">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
