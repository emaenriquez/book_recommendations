import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);
  let error;

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
       
        const data = await response.json();
        login(data.token, { username }); // Assuming user data contains only username for simplicity
        navigate("/profile");
      } else {
        error =  "Invalid username or password."
      }
    } catch (error) {
      console.error("Error logging in:", error);
      error = "Failed to login. Please try again later."
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={handleNameChange} placeholder="usuario o email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="contraseña" />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginPage;
