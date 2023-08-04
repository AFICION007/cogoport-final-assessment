import React, { useRef } from "react";
import "./css/Form.css";

const Form = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleRegister = async (name, email, password, confirmPassword) => {
    const response = await fetch("http://127.0.0.1:3001/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: name,
        email,
        password,
        confirm_password: confirmPassword,
        number_of_followers: 0,
      }),
    });

    return response;
  };

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

    try {
      const response = await handleRegister(
        name,
        email,
        password,
        confirmPassword
      );
      if (response.status === 200) {
        alert("User registered successfully!");
        // Optionally, you can redirect to a new page or show a success message.
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      alert("Error registering user:", error.message);
    }

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

export default Form;
