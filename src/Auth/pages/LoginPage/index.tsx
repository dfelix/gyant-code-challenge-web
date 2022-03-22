import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);

  const [{ username, password }, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn({ username, password });
  };

  return (
    <>
      <div className="container login">
        <h5>Login</h5>
        <div className="login-box">
          <form noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={username}
                type="email"
                name="email"
                id="email"
                onChange={(event) =>
                  setCredentials({
                    username: event.target.value,
                    password,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                type="password"
                name="password"
                id="password"
                onChange={(event) =>
                  setCredentials({
                    username,
                    password: event.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="button-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
