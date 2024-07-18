import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const body = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.status === 400) {
        const data = await response.json();
        if (data.username && data.username.includes("A user with that username already exists.")) {
          setError("A user with that username already exists.");
        }
      } else if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Failed to register. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder="username" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
