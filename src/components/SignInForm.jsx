import React, { useRef } from "react";
import "./css/Form.css";

const SignInForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignIn = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the authentication token from the response
        localStorage.setItem("authToken", data.token);
        alert(`You're successfully signed in, your authtoken is ${data.token}`);

        // update frontend state to indicate user is authenticated
      } else {
        const errorData = await response.json();
        console.error("Sign-in error:", errorData.error);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    handleSignIn(email, password);

    console.log("Sign-in credentials:", { email, password });
    event.target.reset();
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

export default SignInForm;
