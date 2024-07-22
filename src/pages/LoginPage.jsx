import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";
import { loginUser } from "../services/api"

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


  const handleSubmit  = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(username, password);
      login(data.token, { username }); // Assuming user data contains only username for simplicity
      navigate("/profile");
    } catch (err) {
      console.log(err)
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
