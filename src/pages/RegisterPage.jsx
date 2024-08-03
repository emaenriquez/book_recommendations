import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../services/api';
import '../styles/Form.css'

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
    setError(""); // Limpiar cualquier error previo

    try {
      await registerUser(username, email, password);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("El nombre de usuario ya está en uso."); // Mensaje de error si el usuario ya existe
      } else {
        setError("Error al registrarse. Inténtelo de nuevo."); // Mensaje genérico de error
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Registrarse</h2>
      {error && <p className="form__error">{error}</p>}
      <div className="form__group">
        <label className="form__label">Username</label>
        <input className="form__input" type="text" value={username} onChange={handleUsernameChange} placeholder="username" />
      </div>
      <div className="form__group">
        <label className="form__label">Email</label>
        <input className="form__input" type="email" value={email} onChange={handleEmailChange} placeholder="email" />
      </div>
      <div className="form__group">
        <label className="form__label">Password</label>
        <input className="form__input" type="password" value={password} onChange={handlePasswordChange} placeholder="password" />
      </div>
      <button className="form__button" type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterPage;
