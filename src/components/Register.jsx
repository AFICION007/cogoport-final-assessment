import React, { useRef } from "react";
import "./css/Form.css";

var usersCount = 0;

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Your password does not match");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      user_id: usersCount,
      name: name,
      email: email,
      password: password,
      number_of_followers: 0,
    });
    localStorage.setItem("users", JSON.stringify(users));

    usersCount += 1;
    alert("User registered successfully!");
    console.log(users);

    event.target.reset();
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Create Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            ref={nameRef}
            id="name"
            type="text"
            placeholder="John Jacobs"
            className="form-control"
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            type="text"
            placeholder="Confirm password"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
