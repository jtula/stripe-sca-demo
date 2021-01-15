import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "src/services/auth";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      fullName: "",
      email: "",
      password: "",
    };
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};
const SignUp = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    register(formData)
      .then((response) => {
        setSubmitting(false);
        setFormData({
          reset: true,
        });
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <form className="form" onSubmit={handleSubmit}>
          <div
            className="card shadow-sm bg-white rounded p-3"
            style={{ maxWidth: "500px", width: "500px" }}
          >
            <div className="card-body">
              <h3 className="text-center mb-3">Sign Up</h3>
              <fieldset disabled={submitting}>
                <label>
                  <p>Fullname</p>
                  <input required name="fullName" onChange={handleChange} />
                </label>
                <label>
                  <p>Email</p>
                  <input required name="email" onChange={handleChange} />
                </label>
                <label>
                  <p>Password</p>
                  <input
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </label>
              </fieldset>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Submit"
                )}
              </button>
              <div className="d-flex justify-content-end pt-4">
                <Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
