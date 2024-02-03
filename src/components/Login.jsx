import React, { useRef } from "react";
import "./css/Form.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const users = JSON.parse(localStorage.getItem("users"));
    const isPresent = users.filter((user) => user.email === email);

    if (isPresent.length != 0) {
      if (isPresent[0].password === password) {
        alert("User authenticated");
        event.target.reset();
        localStorage.setItem("authUser", JSON.stringify(isPresent[0].user_id));
      } else {
        alert("Wrong password");
        passwordRef.current.value = "";
      }
    } else {
      alert("User does not exist");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Your email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="name@example.com"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            placeholder="password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
