import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../services/api';

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await registerUser(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
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
